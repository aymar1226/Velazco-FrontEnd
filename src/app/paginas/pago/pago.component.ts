import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentDTO } from '../../model';
import { PaymentService } from '../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  paymentDTO:PaymentDTO;

  stripe: any;
  cardElement: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardholderName: string = '';
  billingDetails: any = {
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'PE'
    }
  };

  constructor(private router: Router,private paymentService: PaymentService) { 
    this.paymentDTO=paymentService.getPaymentDTO();
  }

  ngOnInit(): void {
    this.cargarStripe();
  }

  irOrden(): void {
    this.router.navigate(['/inicio/orden']);
  }

  procesarPago(): void {
    this.confirmPayment().then(()=>{
      Swal.fire({
        title: 'Pago procesado',
        text: 'Tu pago ha sido un éxito, tu boleta te llegará a tu correo.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(()=>{
        this.router.navigate(['/inicio/productos']);
      })
    }).catch(error => { // Handle payment confirmation errors
      console.error('Error confirming payment:', error);
      // Show an error message to the user
      Swal.fire({
        title: 'Error en el pago',
        text: 'Hubo un problema al confirmar tu pago. Por favor, inténtalo de nuevo.',
        icon: 'error'
      });
    });
  }

  cargarStripe(){
    loadStripe('pk_test_51PQjD6P99HVja6pDj8gJFz6hKnKAnidjeJCererNmqRplgHv4bxWfk6ilgVvlTG7Yd3UObmzfS8BAfkhiQOxaULv00kPORsdMg')
      .then((stripe: any) => {
        if (stripe) {
          console.log('Stripe Iniciado exitosamente');
          this.stripe = stripe;
          const elements = this.stripe.elements();
          
          const style = {
            base: {
              fontSize: '16px',
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              '::placeholder': {
                color: '#aab7c4'
              }
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a'
            }
          };

          this.cardNumber = elements.create('cardNumber', {style: style});
          this.cardExpiry = elements.create('cardExpiry', {style: style});
          this.cardCvc = elements.create('cardCvc', {style: style});

          this.cardNumber.mount('#card-number');
          this.cardExpiry.mount('#card-expiry');
          this.cardCvc.mount('#card-cvc');

          const handleChange = (event: any) => {
            if (event.error) {
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = undefined;
            }
          };

          this.cardNumber.on('change', handleChange);
          this.cardExpiry.on('change', handleChange);
          this.cardCvc.on('change', handleChange);
        } else {
          console.error('Fallo en Stripe al cargar ');
        }
      })
      .catch((error: any) => {
        console.error('Error cargando Stripe:', error);
      });
  }

  createPaymentIntent() {
    this.paymentService.paymentIntent().subscribe({
      next: (response) => {
        this.paymentDTO = response;
        console.log('Payment Intent created, client secret:', this.paymentDTO.clientSecret);
      },
      error: (error) => console.error('Error creating payment intent:', error)
    });
  }

  async confirmPayment() {
    console.log('Confirming payment...');
    console.log('Client Secret:', this.paymentDTO.clientSecret);
    console.log('Stripe initialized:', !!this.stripe);
  
    if (this.paymentDTO.clientSecret && this.stripe) {
      try {
        const result = await this.stripe.confirmCardPayment(this.paymentDTO.clientSecret, {
          payment_method: {
            card: this.cardNumber,
            billing_details: this.billingDetails
          }
        });
  
        if (result.error) {
          console.error('Error confirming payment:', result.error);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment confirmed:', result.paymentIntent);
            await this.paymentService.confirm(this.paymentDTO.paymentIntentId).subscribe(respones=>{
              
            });
          }
        }
      } catch (error) {
        console.error('Error during payment confirmation:', error);
      }
    } else {
      console.error('No client secret available or Stripe not initialized');
      if (!this.paymentDTO.clientSecret) {
        console.error('Client secret is missing. Make sure createPaymentIntent() was called successfully.');
      }
      if (!this.stripe) {
        console.error('Stripe is not initialized. Check if loadStripe() in ngOnInit() completed successfully.');
      }
    }
  }

  cancelPayment() {
    if (this.paymentDTO.paymentIntentId) {
      this.paymentService.cancel(this.paymentDTO.paymentIntentId).subscribe({
        next: (response) => {
          console.log('Payment canceled:', response);
        },
        error: (error) => console.error('Error canceling payment:', error)
      });
    } else {
      console.error('No payment intent ID available');
    }
  }

}
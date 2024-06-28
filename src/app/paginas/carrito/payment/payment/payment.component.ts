import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';
import { StripeCardElementOptions, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { PaymentDTO } from '../../../../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  //paymentIntentId: string | undefined;
  //clientSecret: string | undefined;
  paymentDTO:PaymentDTO;


  constructor(private paymentService: PaymentService) {
    this.paymentDTO={
      clientSecret:'',
      paymentIntentId:'',
    }
  }

  stripe: any;
  cardElement: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardholderName: string = '';



  ngOnInit() {
    this.cargarStripe();
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
            billing_details: {
              name: this.cardholderName
            }
          }
        });
  
        if (result.error) {
          console.error('Error confirming payment:', result.error);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment confirmed:', result.paymentIntent);
            await this.paymentService.confirm(this.paymentDTO.paymentIntentId).subscribe(respones=>{
              Swal.fire("Pago confirmado")
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
}



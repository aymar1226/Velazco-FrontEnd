import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItem, PaymentDTO } from '../../model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  paymentDTO:PaymentDTO;

  imagenesUrl: { [key: number]: string } = {};
  carritoItems?: CarritoItem[] = [];
  total: number = 0;
  nombre: string = '';
  correo: string = '';
  dni: string = '';

  constructor(private carritoService: CarritoService, private router: Router, private productoService: ProductoService,private paymentService: PaymentService) {
    this.paymentDTO={
      clientSecret:'',
      paymentIntentId:'',
    }
  }

  ngOnInit(): void {
    this.listarItems();
    this.obtenerDatosUsuario();
  }

  listarItems() {
    const email = localStorage.getItem('email');
    if (email) {
      this.carritoService.getItems(email).subscribe(items => {
        this.carritoItems = items;
        this.calcularTotal();
        this.carritoItems.forEach(item => {
          this.productoService.obtenerImagenProducto(item.producto.id).subscribe((imagen: Blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.imagenesUrl[item.producto.id] = reader.result as string;
            };
            reader.readAsDataURL(imagen);
          });
        });
      }, error => {
        Swal.fire("Error al cargar el carrito");
      });
    }
  }

  calcularTotal() {
    this.total = this.carritoItems?.reduce((sum, item) => sum + item.total, 0) || 0;
  }

  irCarrito(): void {
    this.router.navigate(['/inicio/carrito']);
  }


  obtenerDatosUsuario() {
    // Suponiendo que los datos del usuario están almacenados en el localStorage
    this.nombre = localStorage.getItem('nombre') || 'Nombre no disponible';
    this.correo = localStorage.getItem('email') || 'Correo no disponible';
    this.dni = localStorage.getItem('dni') || 'DNI no disponible';
  }

  createPaymentIntent() {
    this.paymentService.paymentIntent().subscribe({
      next: (response) => {
        this.paymentService.setPaymentDTO(response);
        console.log('Payment Intent created, client secret:', this.paymentDTO.clientSecret);
        this.router.navigate(['inicio/pago']);
      },
      error: (error) => console.error('Error creating payment intent:', error)
    });
  }

}
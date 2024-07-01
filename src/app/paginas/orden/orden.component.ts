import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItem, InfoDTO, PaymentDTO } from '../../model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { PaymentService } from '../../services/payment.service';
import { UsuarioService } from '../../services/usuario.service';

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
  info:InfoDTO;
  nombre: string = '';
  correo: string|null = '';
  dni: string = '';

  constructor(private usuarioService:UsuarioService, private carritoService: CarritoService, private router: Router, private productoService: ProductoService,private paymentService: PaymentService) {
    this.paymentDTO={
      clientSecret:'',
      paymentIntentId:'',
    }
    this.info={
      ap_materno:'',
      ap_paterno:'',
      correo:'',
      direccion:'',
      documento:'',
      nombre:'',
      telefono:''
    }
  }

  ngOnInit(): void {
    this.cargarInfo();
    this.listarItems();
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

  cargarInfo(){
    this.usuarioService.getInfo().subscribe((response)=>{
      this.info=response;
    },error=>{
      Swal.fire("No se pudieron encontrar datos disponibles")
    });
  }

}
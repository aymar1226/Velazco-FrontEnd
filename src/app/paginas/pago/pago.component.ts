import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irOrden(): void {
    this.router.navigate(['/inicio/orden']);
  }

  procesarPago(): void {
    Swal.fire({
      title: 'Pago procesado',
      text: 'Tu pago ha sido un éxito, tu boleta te llegará a tu correo.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/inicio/productos']);
    });
  }
}
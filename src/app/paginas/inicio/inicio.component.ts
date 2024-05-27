import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  mostrarBotonInicioSesion : boolean = true;
  mostrarCarrito = false;
  menuAbierto: boolean = false;
  administrarAbierto: boolean = false;
  perfilAbierto: boolean = false;
  quantity: number = 1;
  

  constructor(private activaterouter:ActivatedRoute, private router:Router){}

  n: number = 0;
  time_to_hidden_menu: number = 1200;

  ngOnInit(): void {

    this.activaterouter.params.subscribe(params => {

      if(localStorage.getItem('email'))
      this.mostrarBotonInicioSesion = params['mostrarBotonInicioSesion'] === 'true';
    
    });

  }

  mostrarOpcionesUsuario(): void{
    this.mostrarBotonInicioSesion = false
  }

  irLogin(): void{
    this.router.navigate(['/login'])
  }

  cerrarSesion():void{
    Swal.fire("Sesion cerrada exitosamente")
    this.router.navigate(['/login'])
  }

  irInformacion(): void{
    this.router.navigate(['/informacion'])
  }
  
  irCarrito(): void{
    this.router.navigate(['/carrito'])
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  

  toggleAdministrar(): void {
    this.router.navigate(['/admin']);
  }

  togglePerfil(): void {
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increment() {
    this.quantity++;
  }

  

  toggleCarrito(): void {
      this.mostrarCarrito = !this.mostrarCarrito;
  }
}
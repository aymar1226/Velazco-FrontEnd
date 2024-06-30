import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mostrarBotonInicioSesion: boolean = true;
  mostrarCarritoSearch: boolean = true;
  mostrarCarrito = false;
  menuAbierto: boolean = false;


  constructor(private activaterouter: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkVisibility(event.url);
      }
    });
  }

  ngOnInit(): void {

    this.activaterouter.params.subscribe(params => {

      if (localStorage.getItem('email'))
        this.mostrarBotonInicioSesion = params['mostrarBotonInicioSesion'] === 'true';

    });

  }

  checkVisibility(url: string): void {
    const hiddenRoutes = ['carrito', 'orden', 'pago', 'perfil'];
    this.mostrarCarritoSearch = !hiddenRoutes.some(route => url.includes(route));
  }

  mostrarOpcionesUsuario(): void {
    this.mostrarBotonInicioSesion = false
  }

  irLogin(): void {
    this.router.navigate(['/login'])
  }

  cerrarSesion(): void {
    Swal.fire("Sesion cerrada exitosamente")
    this.router.navigate(['/login'])
  }

  irInformacion(): void {
    this.router.navigate(['/informacion'])
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }


  toggleAdministrar(): void {
    this.router.navigate(['/admin']);
  }

  togglePerfil(): void {
    this.router.navigate(['inicio/perfil/profile']);
  }



  toggleCarrito(): void {
    this.router.navigate(['inicio/carrito'])
  }
}
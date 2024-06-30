import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  currentRoute: string;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  constructor(private router:Router){
    this.currentRoute = this.router.url;
  }


  irProfile(): void{
    this.router.navigate(['/inicio/perfil/profile']);
  }

  irPedidos(): void{
    this.router.navigate(['/inicio/perfil/pedidos']);
  }

  irContrasena(): void{
    this.router.navigate(['/inicio/perfil/modificacion']);
  }


  isRouteActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }
}

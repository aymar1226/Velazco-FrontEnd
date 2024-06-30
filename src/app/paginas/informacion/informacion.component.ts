import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { DataService } from '../../services/data.service';
import { InicioComponent } from '../inicio/inicio.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {
  @ViewChild('nosotros') miDivRef!: ElementRef;
  @ViewChild('productos') miDivRef1!: ElementRef;
  @ViewChild('contacto') miDivRef2!: ElementRef;

  mostrarBotonInicioSesion: boolean = true;
  menuAbierto: boolean = false;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private dataService: DataService,
    private activaterouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activaterouter.params.subscribe(params => {

      if (localStorage.getItem('email'))
        this.mostrarBotonInicioSesion = params['mostrarBotonInicioSesion'] === 'true';

    });
  }


  irInformacion(): void {
    this.router.navigate(['/informacion'])
  }
  irnosotros(): void {
    this.miDivRef.nativeElement.scrollIntoView({ behavior: "smooth" });
  }
  irproductos(): void {
    this.miDivRef1.nativeElement.scrollIntoView({ behavior: "smooth" });
  }
  ircontacto(): void {
    this.miDivRef2.nativeElement.scrollIntoView({ bahavior: "smooth" })
  }

  redirigirACategoria(variable: number) {
    this.dataService.changeVariable(variable);
    this.router.navigate(['/inicio/productos']);
  }

  irLogin(): void {
    this.router.navigate(['/login'])
  }


  cerrarSesion(): void {
    Swal.fire("Sesion cerrada exitosamente")
    this.router.navigate(['/login'])
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }



  toggleAdministrar(): void {
    this.router.navigate(['/admin']);
  }

  irPerfil(): void {
    this.router.navigate(['inicio/perfil/profile'])
  }

}

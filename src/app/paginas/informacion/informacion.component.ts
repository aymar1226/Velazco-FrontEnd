import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { DataService } from '../../services/data.service';
import { InicioComponent } from '../inicio/inicio.component';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {
  @ViewChild('nosotros') miDivRef!: ElementRef;
  @ViewChild('productos') miDivRef1!: ElementRef;
  @ViewChild('contacto') miDivRef2!: ElementRef;
  constructor(
    private router:Router,
    private usuarioService:UsuarioService,
    private dataService:DataService
  ){}

    ngOnInit(): void {
    }


  irInformacion(): void{
    this.router.navigate(['/informacion'])
  }
  irnosotros(): void{
    this.miDivRef.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  irproductos(): void{
    this.miDivRef1.nativeElement.scrollIntoView({behavior: "smooth"});
  }
  ircontacto(): void{
    this.miDivRef2.nativeElement.scrollIntoView({bahavior: "smooth"})
  }    

  redirigirACategoria(variable:number){
    this.dataService.changeVariable(variable);
    this.router.navigate(['/inicio']);
  }

}

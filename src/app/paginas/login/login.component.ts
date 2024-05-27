//@ts-ignore
import  Swal  from 'sweetalert2';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials, RegistroDTO, Usuario } from '../../model';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  creds: Credentials ={
    email: '',
    password:''
  };

  registro: RegistroDTO;
  confirmarPaswword: String='';
  mensajeError: String='';
  usuario? : Usuario;

  @ViewChild('signInBtn') signInBtn!: ElementRef;
  @ViewChild('signUpBtn') signUpBtn!: ElementRef;
  @ViewChild('signInBtn2') signInBtn2!: ElementRef;
  @ViewChild('signUpBtn2') signUpBtn2!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router, private usuarioService:UsuarioService, private snack:MatSnackBar) { 
    this.registro={
        correo: '',
        password: '',
    //  privilegio: '',
        documento: '',
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        telefono: '',
        direccion: 'Av. Ica', 
    }
  }


  ngOnInit(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

/*  formSubmit(){
    console.log(this.user);

    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }


    this.usuarioService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
  }*/


  login(form:NgForm){
    console.log ('form value', form.value)
    this.usuarioService.login(this.creds).subscribe(response =>{
      Swal.fire('Credenciales correctas')  
      this.router.navigate(['/informacion']);

      /*if(response){
        Swal.fire('Credenciales correctas')
        this.router.navigate(['/informacion']);
      }else{
        this.snack.open("Credenciales incorrectas",'Ok',{
          duration : 3000
        });
      }*/
    },error=>{
      console.error("Error al iniciar sesion:",error)
      Swal.fire('Credenciales incorrectas')
    })
  }

  registrarUsuario(form: NgForm){
      this.mensajeError="";

      this.usuarioService.getUsuarioByCorreo(this.registro.correo).subscribe(usuarioObtenido=>{
        console.log(usuarioObtenido);

        this.mensajeError="El correo ya existe";


      },error =>{
        this.mensajeError="";
        
          this.mensajeError="";
          if(this.confirmarPaswword==this.registro.password){

            this.mensajeError="";
            console.log(this.registro);
          
            if(this.registro){
              this.usuarioService.registrarUsuario(this.registro).subscribe(response=>{
      
                Swal.fire('Usuario registrado con exito, puedes iniciar sesion')  
                console.log(this.registro.correo)
      
                this.usuarioService.crearCarrito(this.registro.correo).subscribe(response=>{
                  console.log("Nuevo carrito creado")
                });
              },error=>{
                Swal.fire('No se pudo registrar el usuario')  
              })
            }
          }else{
            this.mensajeError="Las contraseñas no coinciden";
          }
      })
      
        
      
  }





  //animaciones-------------------------------------------------------------------------

  ngAfterViewInit(): void {
    this.renderer.listen(this.signInBtn.nativeElement, 'click', () => {
      this.renderer.removeClass(this.container.nativeElement, 'sign-up-mode');
    });

    this.renderer.listen(this.signUpBtn.nativeElement, 'click', () => {
      this.renderer.addClass(this.container.nativeElement, 'sign-up-mode');
    });

    this.renderer.listen(this.signInBtn2.nativeElement, 'click', () => {
      if (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        this.renderer.removeClass(this.container.nativeElement, 'sign-up-mode2');
      }
    });

    this.renderer.listen(this.signUpBtn2.nativeElement, 'click', () => {
      if (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        this.renderer.addClass(this.container.nativeElement, 'sign-up-mode2');
      }
    });
  }

  //Redirecciones

  irInicio(): void {
    this.router.navigate(['/informacion', { mostrarBotonInicioSesion: true }]);
  }
}
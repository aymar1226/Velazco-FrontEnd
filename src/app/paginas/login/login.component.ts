//@ts-ignore
import Swal from 'sweetalert2';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credentials, RegistroDTO, Usuario } from '../../model';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';
import { right } from '@popperjs/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  creds: Credentials = {
    email: '',
    password: ''
  };
  loginError = false;

  registro: RegistroDTO;
  confirmarPaswword: string = '';
  mensajeError: string = '';
  usuario?: Usuario;

  @ViewChild('signInBtn') signInBtn!: ElementRef;
  @ViewChild('signUpBtn') signUpBtn!: ElementRef;
  @ViewChild('signInBtn2') signInBtn2!: ElementRef;
  @ViewChild('signUpBtn2') signUpBtn2!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router, private usuarioService: UsuarioService, private snack: MatSnackBar) {
    this.registro = {
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


  checkLoginFields(loginForm: NgForm) {
    loginForm.form.markAllAsTouched(); // Marcar todos los campos como tocados

    if (loginForm.invalid) {
      return;
    }

    this.login(loginForm);
  }

  login(form: NgForm) {
    this.usuarioService.login(this.creds).subscribe(
      response => {
        Swal.fire({
          title: 'Credenciales correctas',
          timer: 1000, // tiempo en milisegundos que el mensaje se mostrará
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/informacion']);
        });
      },
      error => {
        console.error("Error al iniciar sesión:", error);
        Swal.fire('Credenciales incorrectas');

        this.loginError = true;
        this.creds.email = '';
        this.creds.password = '';
        form.resetForm(); // Limpiar formulario
      }
    );
  }

  capitalizeWords(str: String): string {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  registrarUsuario(registerForm: NgForm) {
    this.mensajeError = "";

    if (registerForm.valid) {
      if (this.registro.documento.toString().length !== 8) {
        this.snack.open('El DNI debe tener exactamente 8 dígitos', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        return;
      }

      const telefonoStr = this.registro.telefono.toString();
      if (telefonoStr.length !== 9 || telefonoStr.charAt(0) !== '9') {
        this.snack.open('El teléfono debe tener exactamente 9 dígitos y comenzar con el número 9', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        return;
      }

      // Capitalizar las primeras letras de cada palabra
      this.registro.nombre = this.capitalizeWords(this.registro.nombre);
      this.registro.ap_paterno = this.capitalizeWords(this.registro.ap_paterno);
      this.registro.ap_materno = this.capitalizeWords(this.registro.ap_materno);


      
      this.usuarioService.getUsuarioByCorreo(this.registro.correo).subscribe(usuarioObtenido => {
        console.log(usuarioObtenido);

        this.mensajeError = "El correo ya existe";
        this.snack.open('El correo ya existe', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

      }, error => {
        this.usuarioService.getUsuarioByDocumento(this.registro.documento).subscribe(usuarioObtenido => {
          console.log(usuarioObtenido);

          this.mensajeError = "El DNI ya existe";
          this.snack.open('El DNI ya existe', 'Aceptar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });

        }, error => {
          this.mensajeError = "";

          if (this.confirmarPaswword === this.registro.password) {
            console.log(this.registro);

            this.usuarioService.registrarUsuario(this.registro).subscribe(response => {
              Swal.fire('Usuario registrado con éxito, puedes iniciar sesión');
              this.usuarioService.crearCarrito(this.registro.correo).subscribe(response => {
                console.log("Nuevo carrito creado");
              });

            }, error => {
              Swal.fire('No se pudo registrar el usuario');
            });

          } else {
            this.mensajeError = "Las contraseñas no coinciden";
            this.snack.open('Las contraseñas no coinciden', 'Aceptar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
          }
        });
      });

    } else {
      Swal.fire("Hubo un error, intentelo más tarde.");
    }
  }

  validarDNI() {
    if (this.registro.documento.toString().length !== 8) {
      this.snack.open('El DNI debe tener exactamente 8 dígitos', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  validarTelefono() {
    const telefonoStr = this.registro.telefono.toString();
    if (telefonoStr.length !== 9 || telefonoStr.charAt(0) !== '9') {
      this.snack.open('El teléfono debe tener exactamente 9 dígitos y comenzar con el número 9', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
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

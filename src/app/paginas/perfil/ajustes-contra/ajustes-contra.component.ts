import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-ajustes-contra',
  templateUrl: './ajustes-contra.component.html',
  styleUrls: ['./ajustes-contra.component.css']
})
export class AjustesContraComponent{

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private usuarioService:UsuarioService) { }

  

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      // Lógica para cambiar la contraseña
      this.usuarioService.changePassword(this.currentPassword, this.newPassword).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada',
            text: 'Contraseña cambiada exitosamente'
          });
          console.log('Contraseña cambiada exitosamente');
        }, 
        error => {  
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña actual es incorrecta: '
          });
        }
      );
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }
  



}

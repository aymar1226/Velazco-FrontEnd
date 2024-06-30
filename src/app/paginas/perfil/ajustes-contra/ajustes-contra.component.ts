import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes-contra',
  templateUrl: './ajustes-contra.component.html',
  styleUrls: ['./ajustes-contra.component.css']
})
export class AjustesContraComponent{

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() { }

  

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      // Lógica para cambiar la contraseña
      console.log('Contraseña cambiada exitosamente');
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }

}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css']
})
export class EditProfileComponent {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  dni: string;
  correo: string;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombre = data.nombre;
    this.apellidoPaterno = data.apellidoPaterno;
    this.apellidoMaterno = data.apellidoMaterno;
    this.telefono = data.telefono;
    this.dni = data.dni;
    this.correo = data.correo;
  }

  save() {
    this.dialogRef.close({
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      telefono: this.telefono,
      dni: this.dni,
      correo: this.correo
    });
  }

  close() {
    this.dialogRef.close();
  }
}

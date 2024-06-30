import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../EditProfile/EditProfile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string = 'Jorge Armando';
  apellidoPaterno: string = 'Bonifaz';
  apellidoMaterno: string = 'Campos';
  telefono: string = '934931850';
  dni: string = '918894260';
  correo: string = 'JorgemasNagmail.com';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  abrirEditPerfil(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: {
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        telefono: this.telefono,
        dni: this.dni,
        correo: this.correo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nombre = result.nombre;
        this.apellidoPaterno = result.apellidoPaterno;
        this.apellidoMaterno = result.apellidoMaterno;
        this.telefono = result.telefono;
        this.dni = result.dni;
        this.correo = result.correo;
      }
    });
  }
}

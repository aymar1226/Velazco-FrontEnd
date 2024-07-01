import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../EditProfile/EditProfile.component';
import { InfoDTO } from '../../../model';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  info : InfoDTO ;

  constructor(public dialog: MatDialog, private usuarioService:UsuarioService) {
    this.info={
      ap_materno:'',
      ap_paterno:'',
      correo:'',
      direccion:'',
      documento:'',
      nombre:'',
      telefono:''
    }
   }

  ngOnInit() {
    this.cargarInfo();
  }

  abrirEditPerfil(): void {
      const dialogRef = this.dialog.open(EditProfileComponent, {
        width: '400px',
        data: {
          nombre: this.info.nombre,
          apellidoPaterno: this.info.ap_paterno,
          apellidoMaterno: this.info.ap_materno,
          telefono: this.info.telefono,
          dni: this.info.documento,
          correo: this.info.correo
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.info.nombre = result.nombre;
          this.info.ap_paterno = result.apellidoPaterno;
          this.info.ap_materno = result.apellidoMaterno;
          this.info.telefono = result.telefono;
          this.info.documento = result.dni;
          this.info.correo = result.correo;
        }
      });
  }

  cargarInfo(){
    this.usuarioService.getInfo().subscribe((response)=>{
      this.info=response;
    },error=>{
      Swal.fire("No se pudieron encontrar datos disponibles")
    });
  }
}

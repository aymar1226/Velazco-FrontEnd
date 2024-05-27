import { Component, Inject } from '@angular/core';
import { ProveedorService } from '../../../../services/proveedor.service';
import { Proveedor } from '../../../../model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

  proveedor:Proveedor;
  constructor(private proveedorService:ProveedorService,
    private dialogRef: MatDialogRef<CrearProveedorComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any){

      this.proveedor={
        id:0,
        nombre: '',
        correo:'',
        direccion:'',
        telefono:'',
        estado:'1'
      }
  }

  guardar(form:NgForm){

    if(form.valid){
      if(this.proveedor){
        console.log(this.proveedor);
        this.proveedorService.agregarProveedor(this.proveedor).subscribe(response=>{
          this.dialogRef.close(this.data);
          Swal.fire("Proveedor creado con exito")
        },error=>{
          Swal.fire("No se pudo crear un nuevo proveedor ")
        })

      }
    }
  }

}

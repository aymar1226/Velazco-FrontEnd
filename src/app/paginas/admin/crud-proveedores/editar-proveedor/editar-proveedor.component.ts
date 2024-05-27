import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona, Proveedor } from '../../../../model';
import { ProveedorService } from '../../../../services/proveedor.service';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent implements OnInit{
  form: FormGroup;

  proveedor?:Proveedor;


  constructor(
    private proveedorService:ProveedorService,
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any) {

      this.form = this.fb.group({
        proveedor: [data ? data.proveedor : '', Validators.required],
      })

      this.proveedor={
        id:0,
        nombre: '',
        correo:'',
        direccion:'',
        telefono:'',
        estado:'1'
      }
  }

  ngOnInit(): void {
    this.proveedor=this.form.get('proveedor')?.value;
  }

  guardar(form:NgForm){
    if(form.valid){
      if(this.proveedor){
        console.log(this.proveedor);
        this.proveedorService.editarProveedores(this.proveedor).subscribe(response=>{
          this.dialogRef.close(this.data);
          Swal.fire("Proveedor actualizado con exito")
        },error=>{
          Swal.fire("No se pudo actualizar el proveedor ")
        })

      }
    }
  }

}

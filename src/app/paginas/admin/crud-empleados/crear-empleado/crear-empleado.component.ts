import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../../../services/personal.service';
import { Cargo, Empleado } from '../../../../model';
import Swal from 'sweetalert2';
import { Form, NgForm } from '@angular/forms';
import { error } from 'console';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent implements OnInit{

  cargos? : Cargo[];
  empleado : Empleado;

  constructor(
    private personalService:PersonalService, 
    private router:Router,
    private snack:MatSnackBar,
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
  ) {
    this.empleado={
      id:0,
      estado:'1',
      persona:{
        id:0,
        documento:'',
        nombre:'',
        ap_paterno:'',
        ap_materno:'',
        telefono:'',
        direccion:'',
        estado: '1',
      },
      cargo:{
        id: 0,
        nombre:'',
        estado:''
      }

    }
  }
  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos(){
      this.personalService.getCargos().subscribe(cargosObtenidos=>{
        this.cargos=cargosObtenidos;
        console.log(this.cargos);
      },error=>{
        Swal.fire("Error obteniendo cargos");
      })
  }

  agregarEmpleado(form:NgForm){

    if(form.valid){
      console.log(this.empleado);
      this.personalService.agregarPersonal(this.empleado).subscribe(response =>{
        Swal.fire('Empleado agregado con exito');
      
        this.router.navigate(['/admin']);
        console.log('Empleado agregado con éxito:', response);

        this.dialogRef.close(true);

      },error =>{
        this.snack.open("Error al agregar empleado",'Ok',{
          duration : 3000
        }); 
        console.error('Error al agregar el empleado:', error);
      })
    }else{
      Swal.fire('Datos incorrectos')  
    }
  }
}

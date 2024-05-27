import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { PersonalService } from '../../../../services/personal.service';
import { Persona, PersonaUsuarioDTO, Usuario } from '../../../../model';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario-empleado',
  templateUrl: './crear-usuario-empleado.component.html',
  styleUrl: './crear-usuario-empleado.component.css'
})
export class CrearUsuarioEmpleadoComponent implements OnInit{

  form: FormGroup;
  persona : PersonaUsuarioDTO;

  confimarContrasenia : String='';

  constructor(
    private personalService:PersonalService,
    private fb: FormBuilder,
    private renderer : Renderer2,
    private dialogRef: MatDialogRef<CrearUsuarioEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any) {
      this.form = this.fb.group({
        id: [data ? data.persona.id : '', Validators.required]
      });

      this.persona={
        personaId: 0,
        personaNombre:'',
        usuarioId:0,
        usuarioCorreo:'',
        usuarioPrivilegio:'',
        usuarioContrasenia:'',
        estadoUsuario:'1'

      }


    }


  ngOnInit(): void {

    this.persona.personaId= this.form.get('id')?.value;
    console.log(this.persona);

  }

     
    

  
  


  crearUsuarioAEmpleado(){

    if(this.persona){
      this.personalService.crearUsuariOAPersonal(this.persona);
    }else{
      Swal.fire("Error al crear usuario");
    }
  }
  
}

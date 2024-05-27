import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { PersonalService } from '../../../../services/personal.service';
import { Persona, PersonaUsuarioDTO, Privilegio, Usuario } from '../../../../model';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario-empleado',
  templateUrl: './crear-usuario-empleado.component.html',
  styleUrl: './crear-usuario-empleado.component.css'
})
export class CrearUsuarioEmpleadoComponent implements OnInit{

  form: FormGroup;
  persona : PersonaUsuarioDTO;
  privilegios?:Privilegio[]

  confimarContrasenia : String='';

  constructor(
    private personalService:PersonalService,
    private usuarioService:UsuarioService,
    private fb: FormBuilder,
    private renderer : Renderer2,
    private dialogRef: MatDialogRef<CrearUsuarioEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any) {
      this.form = this.fb.group({
        id: [data ? data.id : '', Validators.required]
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

  obtenerPrivilegios(){
    this.usuarioService.getPrivilegios().subscribe(privilegiosObtenidos=>{
      this.privilegios=privilegiosObtenidos
    })
  }


  crearUsuarioAEmpleado(form: NgForm){
    console.log(this.persona)

    if(form.valid){
      if(this.persona){

        this.personalService.crearUsuariOAPersonal(this.persona).subscribe(response=>{
          

        },error=>{
          Swal.fire("No se pudo crear el usuario");

        });
      }else{

        Swal.fire("Error al crear usuario");
      }
    }
  
  }
  
}

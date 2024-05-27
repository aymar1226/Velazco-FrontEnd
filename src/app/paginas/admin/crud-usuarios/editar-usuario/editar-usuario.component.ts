import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { PersonaUsuarioDTO, Privilegio, Usuario } from '../../../../model';
import { error } from 'console';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit{
  form: FormGroup;

  privilegios?:Privilegio[];
  privilegio:Privilegio;
  personaDTO: PersonaUsuarioDTO;
  usuario?: Usuario;

  constructor(private usuarioService:UsuarioService,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    private fb: FormBuilder,
     
    @Inject(MAT_DIALOG_DATA)public data: any
  ){
    this.form = this.fb.group({
      usuario: [data ? data.usuario : '', Validators.required],
  
    });
    this.privilegio={
      id:0,
      nombre:'',
      estado:'1'

    }
    this.personaDTO={
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
    this.usuario=this.form.get('usuario')?.value;
    this.obtenerPrivilegios();
    this.obtenerPrivilegioActual();

  }

  obtenerPrivilegioActual(){

    if(this.privilegio && this.usuario){
      this.usuarioService.getPrivilegioByCorreo(this.usuario.correo).subscribe(privilegioObtenido=>{
        this.privilegio=privilegioObtenido
        if(this.usuario){
          this.personaDTO.usuarioCorreo=this.usuario.correo;
        }
       
      },error=>{
        Swal.fire("Error obteniendo privilegio actual")
      });
    }
    
    
   
  }

  obtenerPrivilegios(){
    this.usuarioService.getPrivilegios().subscribe(privilegiosObtenidos=>{
      this.privilegios=privilegiosObtenidos
    },error=>{
      Swal.fire("No se pudo obtener los privilegios")
    })
  }

  editarUsuario(form:NgForm){
    console.log(this.personaDTO);

    this.usuarioService.canmbiarPrivilegio(this.personaDTO).subscribe(response=>{
      Swal.fire("Usuario actualizado con exito")
      this.dialogRef.close(this.data);

    },error=>{
      Swal.fire("No se pudo actualizar el usuario")
    })
  }

}

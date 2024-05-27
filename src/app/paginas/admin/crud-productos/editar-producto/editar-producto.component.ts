import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Categoria, Producto } from '../../../../model';
import { ProductoService } from '../../../../services/producto.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  form: FormGroup;
  imagenUrl: any;

  //variables funcionalidad


  mostrareditar:boolean=false;
  idSeleccionado?:number;
  producto?: Producto;
  categorias?:Categoria[];

  //variables de manejo de imagenes
  previsualizacion?:string;
  archivo? : any;
  url?: string;

  constructor(
    private renderer : Renderer2, 
    private productoService:ProductoService, 
    private router:Router,
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditarProductoComponent>,
     
    @Inject(MAT_DIALOG_DATA)public data: any) {
      this.form = this.fb.group({
        id: [data ? data.id : '', Validators.required],
        nombre: [data ? data.nombre : '', Validators.required],
        descripcion: [data ? data.descripcion : '', Validators.required],
        categoria: [data ? data.categoria : '', Validators.required],
        precio: [data ? data.precio : '', Validators.required],
        stock: [data ? data.stock : '', Validators.required],
        imagen: [data ? data.imagen : '', Validators.required]
      });
   }




  ngOnInit() {
    this.idSeleccionado=this.form.get('id')?.value;
    this.obtenerProducto();
  }



  obtenerProducto(){
    console.log(this.idSeleccionado);
    
      if(this.idSeleccionado){
      this.productoService.getProductobyId(this.idSeleccionado).subscribe(productoObtenido =>{
        this.producto=productoObtenido;
        this.getCategorias();
        this.cargarImagen();
        console.log(productoObtenido);
      },error =>{
        Swal.fire('No se puedo obtener el producto')  
        console.log('error al obtener el producto')
      } );
   }
  }

  getCategorias(): void {
    this.productoService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  confirmarProducto(form:NgForm){

    if(this.idSeleccionado && this.producto){
    this.productoService.editarProducto(this.idSeleccionado,this.producto).subscribe(productoModificado=>{

      console.log(productoModificado);
      this.dialogRef.close(this.data);
    })
    }
  }
  

  cargarImagen(){
    let file;
    if(this.idSeleccionado){
      this.productoService.obtenerImagenProducto(this.idSeleccionado).subscribe(Image=>{
        file=Image;
        this.productoService.extraerbase64(file).then((imagen:any) =>{
          this.previsualizacion = imagen.base;
          console.log(imagen)
        })
      })
      }
  }
  
  //cargar nueva imagen
  upload(event:any){
    const file=event.target.files[0];
    this.productoService.extraerbase64(file).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
      console.log(imagen)
    })
    this.archivo=file;
  }

  subirArchivo():any{
    try{
      if(this.archivo && this.producto){
        this.producto.imagen = this.archivo.name;
        
        const formData = new FormData();
        formData.append('file',this.archivo);

        this.productoService.uploadFile(formData)
          .subscribe(response =>{
            console.log('response', response)
            this.url = response.url
          })
      }
    }catch(e){
      console.log('ERROR', e);
    }
  }

  //animaciones





}

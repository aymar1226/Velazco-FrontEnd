import { Component, Inject, OnInit } from '@angular/core';
import { Categoria, Producto } from '../../../../model';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../services/producto.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  archivo? : any;
  public previsualizacion?:string;
  url?: string;

  producto: Producto;
  categorias?: Categoria[];
  categoriaSelecciona?: Categoria

  private imagenSubida: boolean = false;



  constructor(
    private productoService: ProductoService,
    private router: Router,
    private snack:MatSnackBar,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    ){
      this.producto = {
        id: 0, 
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: '',
        imagen: 'default.jpg',
        estado: '1', 
        categoria:{
          id: 0,
          nombre: '',
          descripcion: '',
          estado:''
        },
      };

    }

  ngOnInit() {
    this.getCategorias();
  }

  agregarProducto(form: NgForm){
    this.upload;
    console.log('form value', form.value)
    
    if(form.valid){
      this.productoService.agregarProducto(this.producto).subscribe(response =>{
        console.log(this.producto);
        Swal.fire('Producto agregado con exito');
        if(this.imagenSubida=true){
          this.subirArchivo();
        }
        this.router.navigate(['/admin']);
        console.log('Producto agregado con éxito:', response);

        this.dialogRef.close(true);

      },error =>{
        this.snack.open("Error al agregar producto",'Ok',{
          duration : 3000
        }); 
        console.error('Error al agregar el producto:', error);
      })
    }else{
      Swal.fire('Formulario incorrecto')  
    }
  }

  getCategorias(): void {
    this.productoService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  //cargar imagen
  upload(event:any){
    const file=event.target.files[0];
    this.extraerbase64(file).then((imagen:any) =>{
      this.previsualizacion = imagen.base;
      console.log(imagen)
    })
    this.archivo=file;

    if(this.archivo){
      this.producto.imagen = this.archivo.name;
      this.imagenSubida= true;
    }

  }

  extraerbase64 = async($event:any) => new Promise((resolve, reject)=>{
    try{
      const unsafeimg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeimg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
    }catch(e){
      reject(e);
    }
  })


  subirArchivo():any{
    try{
      if(this.archivo){
        
        const formData = new FormData();
        formData.append('file',this.archivo);

        this.productoService.uploadFile(formData)
          .subscribe(response =>{
            console.log('response', response)
            this.url = response.url
          })
      }else{
        
        console.log("imagen nula");
      }
    }catch(e){
      console.log('ERROR', e);
    }
  }





}

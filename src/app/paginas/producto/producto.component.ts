import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Categoria, Producto, ProductoDTO } from '../../model';
import { CarritoService } from '../../services/carrito.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  imagenesUrl: { [key: number]: string } = {};
  categorias?: Categoria[];
  categoriaSeleccionada?: number=1;
  productos?: Producto[];

  producto?:Producto;

  productoDTO: ProductoDTO;


  mostrarBotonInicioSesion : boolean = true;
  menuAbierto: boolean = false;
  administrarAbierto: boolean = false;
  perfilAbierto: boolean = false;
  quantity: number = 1;

  variable: any;


  

  constructor(
    private productoService: ProductoService,
    private carritoService:CarritoService,
    private dataService: DataService  
  ){
    this.productoDTO ={
      id: 0,
      cantidad: 0
    }

  }


  ngOnInit(): void {

    this.getCategorias();

    this.dataService.currentVariable.subscribe(variable => {
      if(variable){
        this.categoriaSeleccionada = variable;
      }
    });
    
    if(this.categoriaSeleccionada){
      this.getProductosPorCategoria(this.categoriaSeleccionada);

    }
    
    
  }
/*----------------------------------------ANIMACIONES---------------------------------------*/

decrement() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

increment() {
  this.quantity++;
}


/*----------------------------------Productos---------------------------------------*/
getProductosPorCategoria(id: number): void {
  
  this.productoService.getProductosPorCategoria(id)
    .subscribe(productos =>{
       this.productos = productos;

       productos.forEach(producto => {
        this.productoService.obtenerImagenProducto(producto.id).subscribe((imagen: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imagenesUrl[producto.id] = reader.result as string;
          };
          reader.readAsDataURL(imagen);
        });
      });
    });
  }

  getCategorias(): void {
    this.productoService.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }
  
  seleccionarCategoria(id: number): void {
    this.categoriaSeleccionada = id;
    this.getProductosPorCategoria(id);
  }

  estaSeleccionada(id: number): boolean {
    return this.categoriaSeleccionada===id;
  }

  obtenerProducto(id:number){
      if(id){
      this.productoService.getProductobyId(id).subscribe(productoObtenido =>{
        this.producto=productoObtenido;
        console.log(productoObtenido);

        this.agregarItem();
      },error =>{
        Swal.fire('No se puedo obtener el producto')  
        console.log('error al obtener el producto')
      } );
   }
  }


  agregarItem() {

    console.log(this.producto);

    if(this.producto){
      this.productoDTO.id=this.producto.id;
      this.productoDTO.cantidad=this.quantity;
    }


    console.log(this.productoDTO)
    
    if(this.productoDTO){
  
      this.carritoService.guardarItem(this.productoDTO).subscribe(response=>{
        Swal.fire('producto añadido al carrito')  
        console.log(this.productoDTO);
      })
    }else{
      Swal.fire('error al añadir a carrito')  
    }
  }

}

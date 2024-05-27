import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItem, Producto, ProductoDTO } from '../../model';
import { error } from 'console';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  imagenesUrl: { [key: number]: string } = {};

  carritoItems? : CarritoItem[];

  producto:number=0;



  constructor(private carritoService:CarritoService,private inicioComponent:InicioComponent, private productoService:ProductoService){

  }
  
  ngOnInit(): void {
    this.listarItems();
  }

  listarItems(){
    const email = localStorage.getItem('email');
    if(email){
    this.carritoService.getItems(email).subscribe(items=>{
      this.carritoItems=items;

      this.carritoItems.forEach(item => {

        console.log(item.producto.id);

        
        this.productoService.obtenerImagenProducto(item.producto.id).subscribe((imagen: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imagenesUrl[item.producto.id] = reader.result as string;
          };
          reader.readAsDataURL(imagen);
        });
      });
    },error=>{
      Swal.fire("Error al cargar el carrito")
    })
    }
  }

  irInicio(): void{
    this.inicioComponent.toggleCarrito();
  }


  eliminarItem(id:number){
    console.log(id);

    this.carritoService.deleteItem(id).subscribe({
      next:() =>{
        console.log('Item eliminado con éxito');
        this.listarItems();
      },error:(err) =>{
        console.error('Error al eliminar el ítem:', err);
      }
    });
  }



}

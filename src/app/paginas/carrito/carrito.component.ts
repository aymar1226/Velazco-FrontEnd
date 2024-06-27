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

  carritoItems? : CarritoItem[] = [];

  total: number=0;

  producto:number=0;



  constructor(private carritoService:CarritoService,private router: Router, private productoService:ProductoService){

  }
  
  ngOnInit(): void {
    this.listarItems();
  }

  listarItems(){
    const email = localStorage.getItem('email');
    if(email){
    this.carritoService.getItems(email).subscribe(items=>{
      this.carritoItems=items;
      this.calcularTotal();

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

  calcularTotal() {
    this.total = this.carritoItems?.reduce((sum, item) => sum + item.total, 0) || 0;
  }

  irInicio(): void{
    this.router.navigate(['/inicio/productos'])
  }


  eliminarItem(id: number, nombre: String) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que quieres eliminar ${nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.deleteItem(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
            this.listarItems();
          },
          error: (err) => {
            console.error('Error al eliminar el ítem:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el producto. Por favor, inténtelo de nuevo.', 'error');
          }
        });
      }
    });
  }

  irOrden():void{
    this.router.navigate(['/inicio/orden'])
  }



}

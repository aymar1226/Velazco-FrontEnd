import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { DetalleOrden, Orden } from '../../../model';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';

interface Pedido {
  id: number;
  productos: Producto[];
}

interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  imagenesUrl: { [key: number]: string } = {};


  ordenes: Orden[] = [];
  detallesOrdenSeleccionada: DetalleOrden[] = [];
  pedidoSeleccionado: Orden | null = null;

  constructor(private pedidoService: PedidoService, private productoService:ProductoService) {}

  ngOnInit() {
    this.listarOrdenes();
  }

  listarOrdenes(): void {
    this.pedidoService.listarOrdenesPorUsuario().subscribe((ordenes) => {
      this.ordenes = ordenes;
    });
  }

  seleccionarPedido(orden: Orden): void {
    this.pedidoSeleccionado = orden;
    this.listarDetallesOrden(orden.id);
  }

  listarDetallesOrden(id: number): void {
    this.pedidoService.listarDetalles(id).subscribe((detalles) => {
      this.detallesOrdenSeleccionada = detalles;

      detalles.forEach((detalle) => {
        this.productoService.obtenerImagenProducto(detalle.producto.id).subscribe((imagen: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imagenesUrl[detalle.producto.id] = reader.result as string;
          };
          reader.readAsDataURL(imagen);
        });
      });
    });
  }

  eliminarPedido(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.eliminarPedido(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado!',
              'El pedido ha sido eliminado.',
              'success'
            );
            this.ordenes = this.ordenes.filter((orden) => orden.id !== id);
            if (this.pedidoSeleccionado && this.pedidoSeleccionado.id === id) {
              this.pedidoSeleccionado = null;
              this.detallesOrdenSeleccionada = [];
            }
          },
          error => {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el pedido.',
              'error'
            );
          }
        );
      }
    });
  }
}

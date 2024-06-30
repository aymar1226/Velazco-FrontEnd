import { Component, OnInit } from '@angular/core';

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
  pedidos: Pedido[] = [
    {
      id: 1,
      productos: [
        { nombre: 'Chocotejas', cantidad: 6, precio: 3.00, imagen: 'assets/layout/bizcochos.jpg' },
        { nombre: 'Chocotejas', cantidad: 6, precio: 3.00, imagen: 'assets/layout/bizcochos.jpg' },
        { nombre: 'Chocotejas', cantidad: 6, precio: 3.00, imagen: 'assets/layout/bizcochos.jpg' },
        { nombre: 'Chocotejas', cantidad: 6, precio: 3.00, imagen: 'assets/layout/bizcochos.jpg' },
        { nombre: 'Chocotejas', cantidad: 6, precio: 3.00, imagen: 'assets/layout/bizcochos.jpg' },
      ]
    },
    {
      id: 2,
      productos: [
        { nombre: 'Otro Producto', cantidad: 2, precio: 5.00, imagen: 'assets/layout/bizcochos.jpg' },
      ]
    }
  ];

  pedidoSeleccionado: Pedido | null = null;

  ngOnInit() {
    // Cualquier inicialización necesaria
  }

  seleccionarPedido(pedido: Pedido): void {
    this.pedidoSeleccionado = pedido;
    console.log('Pedido seleccionado:', this.pedidoSeleccionado); // Para depuración
  }

  eliminarPedido(id: number): void {
    this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    if (this.pedidoSeleccionado && this.pedidoSeleccionado.id === id) {
      this.pedidoSeleccionado = null;
    }
  }
}
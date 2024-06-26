import { Component, OnInit } from '@angular/core';
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
  categoriaSeleccionada?: number = 1;
  productos?: Producto[];
  nombreCategoriaSeleccionada: String = '';

  producto?: Producto;

  productoDTO: ProductoDTO;


  mostrarBotonInicioSesion: boolean = true;
  menuAbierto: boolean = false;
  administrarAbierto: boolean = false;
  perfilAbierto: boolean = false;
  quantity: number[] = [];

  variable: any;




  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private dataService: DataService,
    private router: Router
  ) {
    this.productoDTO = {
      id: 0,
      cantidad: 0
    }

  }


  ngOnInit(): void {

    this.getCategorias();

    this.dataService.currentVariable.subscribe(variable => {
      if (variable) {
        this.categoriaSeleccionada = variable;
      }
    });

    if (this.categoriaSeleccionada) {
      this.getProductosPorCategoria(this.categoriaSeleccionada);

    }


  }
  /*----------------------------------------ANIMACIONES---------------------------------------*/

  decrement(index: number) {
    if (this.quantity[index] > 1) {
      this.quantity[index]--;
    }
  }

  increment(index: number) {
    this.quantity[index]++;
  }


  /*----------------------------------Productos---------------------------------------*/
  getProductosPorCategoria(id: number): void {

    this.productoService.getProductosPorCategoria(id)
      .subscribe(productos => {
        this.productos = productos;

        productos.forEach((producto,index) => {
          this.quantity[index] = 1;
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

  getCategorias(): Promise<void> {
    return new Promise((resolve) => {
      this.productoService.getCategorias()
        .subscribe(categorias => {
          this.categorias = categorias;
          const categoria = this.categorias?.find(cat => cat.id === this.categoriaSeleccionada);
          if (categoria) {
            this.nombreCategoriaSeleccionada = categoria.nombre;
          }
          resolve();
        });
    });
  }

  seleccionarCategoria(id: number): void {
    this.categoriaSeleccionada = id;
    this.getProductosPorCategoria(id);
    const categoria = this.categorias?.find(cat => cat.id === id);
    if (categoria) {
      this.nombreCategoriaSeleccionada = categoria.nombre;
    }
  }

  estaSeleccionada(id: number): boolean {
    return this.categoriaSeleccionada === id;
  }

  obtenerProducto(id: number, index:number) {
    if (id) {
      this.productoService.getProductobyId(id).subscribe(productoObtenido => {
        this.producto = productoObtenido;
        console.log(productoObtenido);

        this.agregarItem(index);
      }, error => {
        Swal.fire('No se pudo guardar el producto, tienes que iniciar sesion para comprar productos')
        console.log('error al obtener el producto')
      });
    }
  }


  agregarItem(index: number) {

    if (localStorage.getItem('email')) {
      console.log(this.producto);

      if (this.producto) {
        this.productoDTO.id = this.producto.id;
        this.productoDTO.cantidad = this.quantity[index];
      }


      console.log(this.productoDTO)

      if (this.productoDTO) {

        this.carritoService.guardarItem(this.productoDTO).subscribe(response => {
          Swal.fire({
            title: 'Producto añadido al carrito',
            text: '¿Qué te gustaría hacer ahora?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#d2691e',  // color chocolate
            cancelButtonColor: '#8b4513',  // color marrón
            confirmButtonText: 'Ir al carrito',
            cancelButtonText: 'Seguir comprando'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/inicio/carrito']);
            }
          });
          console.log(this.productoDTO);
        })
      } else {
        Swal.fire('error al añadir a carrito')
      }
    } else {
      Swal.fire('Tienes que iniciar sesion para poder comprar productos')
      this.router.navigate(['/login'])
    }
  }

}

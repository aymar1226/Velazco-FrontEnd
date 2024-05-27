import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { response } from 'express';


@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.css']
})
export class CrudProductosComponent implements OnInit{
  //Variables animaciones
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'categoria', 'nombre', 'descripcion', 'precio', 'stock', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  //variables funcionalidad
  opcion?:number;
  mostrareditar:boolean = false;

  productos?: Producto[];

  imagenesUrl: { [key: number]: string } = {}; 

  constructor(
    private productoService: ProductoService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  
    this.dataSource = new MatTableDataSource<Producto>([]);

   }

   ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.dataSource.data = productos; // Actualiza el dataSource aquí
    });
  }





  //Animaciones------------------------------------------------------------------------------------------------------
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  
  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  editar(element: Producto) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '500px',
      height: '650px',
      data: {id:element.id, nombre: element.nombre, descripcion: element.descripcion, categoria: element.categoria.nombre,
        precio: element.precio, stock: element.stock, imagen: element.imagen
       }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerProductos();
      console.log('El diálogo se ha cerrado');
    });
  }
  
  eliminar(element: Producto): void {
    // Aquí puedes implementar la lógica para eliminar un producto
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF0000', // Rojo para el botón de confirmación
      cancelButtonColor: '#000000', // Negro para el botón de cancelar
      confirmButtonText: 'Sí, eliminar fila',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar la fila aquí
        this.productoService.eliminarProducto(element.id).subscribe(response=>{
          
        })
        // this.dataSource = this.dataSource.filter(item => item !== element);
        Swal.fire({
          title: 'Eliminado',
          text: 'La fila ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#000000' // Negro para el botón OK de la alerta de eliminación
        });
        element.estado='0';
      }
    });
  }
  
  crearElemento() {
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
      height:'650px',
      data: { nombre: '', descripcion: '', categoria: '', precio: null, stock: null, imagen: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar los datos ingresados por el usuario para crear un nuevo producto
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
        this.obtenerProductos();
      }
    });
  }
  
  sortData(sort: { active: String; direction: String }) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
  
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'categoria': return compare(a.categoria.nombre, b.categoria.nombre, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'descripcion': return compare(a.descripcion, b.descripcion, isAsc);
        case 'precio': return compare(a.precio, b.precio, isAsc);
        case 'stock':return compare(a.stock, b.stock, isAsc);
        default: return 0;
      }
    });
  function compare(a: number | String, b: number | String, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}


}


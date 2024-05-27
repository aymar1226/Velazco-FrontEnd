import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor } from '../../../model';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorService } from '../../../services/proveedor.service';
import Swal from 'sweetalert2';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';

@Component({
  selector: 'app-crud-proveedores',
  templateUrl: './crud-proveedores.component.html',
  styleUrl: './crud-proveedores.component.css'
})
export class CrudProveedoresComponent {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'nombre', 'telefono', 'correo', 'direccion', 'acciones']; // Agregando 'acciones'
  dataSource: MatTableDataSource<Proveedor>;

  proveedores?:Proveedor[];

  constructor(public dialog: MatDialog, private proveedorService:ProveedorService) {
    this.dataSource = new MatTableDataSource(this.proveedores);
  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(){
    this.proveedorService.getProveedores().subscribe(proveedoresObtenidos => {
      this.proveedores = proveedoresObtenidos;
      this.dataSource.data = proveedoresObtenidos; // Actualiza el dataSource aquí
      console.log(this.proveedores);
    });
  }


  //Animaciones---------------------------------------------------------------------------

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

  crearElemento() {
    const dialogRef = this.dialog.open(CrearProveedorComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
      height:'520px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar los datos ingresados por el usuario para crear un nuevo producto
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
        this.obtenerProveedores();
      }
    });
  }

  editar(element: Proveedor) {
    // Aquí puedes implementar la lógica para eliminar un producto
    const dialogRef = this.dialog.open(EditarProveedorComponent, {
      width: '500px',
      height: '520px',
      data: { proveedor: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Proveedor): void {
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
        this.proveedorService.eliminarProveedor(element).subscribe(response=>{
          
        });
        // this.dataSource = this.dataSource.filter(item => item !== element);
        Swal.fire({
          title: 'Eliminado',
          text: 'La fila ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#000000' // Negro para el botón OK de la alerta de eliminación
        });
        element.estado = '0';
      }
    });
  }

  sortData(sort: { active: string; direction: string }) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'telefono': return compare(a.telefono, b.telefono, isAsc);
        case 'correo': return compare(a.correo, b.correo, isAsc);
        case 'direccion': return compare(a.direccion, b.direccion, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | String, b: number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


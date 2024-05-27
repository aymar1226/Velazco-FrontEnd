import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from '../../../model';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrl: './crud-usuarios.component.css'
})
export class CrudUsuariosComponent implements OnInit {
  //Variables animaciones
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'rol', 'Nombre', 'Apellido', 'Correo', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  // Definición de propiedades para la paginación
  currentPage: number = 1;
  totalPages: number = 1;

  //variables funcionalidad
  opcion?:number;
  mostrareditar:boolean = false;

  usuarios?: Usuario[];

  imagenesUrl: { [key: number]: string } = {}; 

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  
    this.dataSource = new MatTableDataSource<Usuario>([]);

   }

   ngOnInit(): void {
    this.obtenerUsuarios();
    this.totalPages = Math.ceil(this.dataSource.data.length / 10); // Cambia 10 al tamaño de página que prefieras

  }

  obtenerUsuarios(){
    this.usuarioService.getUsuarios().subscribe(usuariosObtenidos => {
      this.usuarios = usuariosObtenidos;
      this.dataSource.data = usuariosObtenidos; // Actualiza el dataSource aquí
      console.log(this.usuarios);
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
  
  editar(element: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '500px',
      height: '350px',
      data: { nombre: element.persona.nombre, correo: element.correo}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerUsuarios();
      console.log('El diálogo se ha cerrado');
    });
  }
  
  eliminar(element: Usuario): void {

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
        // this.dataSource = this.dataSource.filter(item => item !== element);
        Swal.fire({
          title: 'Eliminado',
          text: 'La fila ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#000000' // Negro para el botón OK de la alerta de eliminación
        });
      }
    });
  }
  
  crearElemento() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent, {
      width: '550px', // Ajusta el ancho según tus necesidades
      height: '750px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

// Métodos para la paginación
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.goToPage(this.currentPage);
      }
    }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    if (this.dataSource.paginator) {
      const startIndex = (this.currentPage - 1) * this.dataSource.paginator.pageSize;
      const endIndex = startIndex + this.dataSource.paginator.pageSize;
      this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
    }
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
        case 'rol': return compare(a.privilegio.nombre, b.privilegio.nombre, isAsc);
        case 'Nombre': return compare(a.persona.nombre, b.persona.nombre, isAsc);
        case 'Apellido': return compare(a.persona.ap_paterno, b.persona.ap_paterno, isAsc);
        case 'Correo': return compare(a.correo, b.correo, isAsc);
        default: return 0;
      }
    });

  function compare(a: number | String, b: number | String, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado, Usuario } from '../../../model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { UsuarioService } from '../../../services/usuario.service';
import { CrearUsuarioEmpleadoComponent } from './crear-usuario-empleado/crear-usuario-empleado.component';
import { PersonalService } from '../../../services/personal.service';

@Component({
  selector: 'app-crud-empleados',
  templateUrl: './crud-empleados.component.html',
  styleUrl: './crud-empleados.component.css'
})
export class CrudEmpleadosComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  filterValue: string = '';
  displayedColumns = ['id', 'nombre', 'apellido', 'telefono','dni', 'direccion', 'cargo', 'acciones'];
  dataSource: MatTableDataSource<Empleado>;

  empleados?:Empleado[];

  constructor(public dialog: MatDialog, private personalService: PersonalService) {

    // Inicializar la fuente de datos
    this.dataSource = new MatTableDataSource(this.empleados);
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }
  
  obtenerEmpleados(){
    this.personalService.getEmpleados().subscribe(empleadosObtenidos => {
      this.empleados = empleadosObtenidos;
      this.dataSource.data = empleadosObtenidos; // Actualiza el dataSource aquí
      console.log(this.empleados);
    });
  }



  //Animaciones------------------------------------------------------------------------

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

  crearUsuario(element: Empleado) {
    
    // Aquí puedes implementar la lógica para crear un usuario
    const dialogRef = this.dialog.open(CrearUsuarioEmpleadoComponent, {
      data: {id:element.persona.id},
      width: '500px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
    });
  }

  eliminar(element: Empleado): void {
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

        //element.bloqueado = true;
      }
    });
  }


  crearElemento() {
    const dialogRef = this.dialog.open(CrearEmpleadoComponent, {
      width: '500px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se ha cerrado');
      // Aquí puedes manejar los datos ingresados por el usuario, si es necesario
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
        case 'nombre': return compare(a.persona.nombre, b.persona.nombre, isAsc);
        case 'apellido': return compare(a.persona.ap_paterno, b.persona.ap_paterno, isAsc);
        case 'telefono': return compare(a.persona.telefono, b.persona.telefono, isAsc);
        case 'dni': return compare(a.persona.documento, b.persona.documento, isAsc);
        case 'direccion': return compare(a.persona.direccion, b.persona.direccion, isAsc);
        case 'cargo': return compare(a.cargo.nombre, b.cargo.nombre, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | String, b: number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


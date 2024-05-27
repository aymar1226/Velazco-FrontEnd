import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crud-clientes',
  templateUrl: './crud-clientes.component.html',
  styleUrl: './crud-clientes.component.css'
})
export class CrudClientesComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'telefono', 'dni', 'direccion'];
  dataSource: MatTableDataSource<Cliente>;

  clientes?:Cliente[];

  constructor(private usuarioService: UsuarioService) {
  
    this.dataSource = new MatTableDataSource(this.clientes);
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.usuarioService.getClientes().subscribe(clientesObtenidos => {
      this.clientes = clientesObtenidos;
      this.dataSource.data = clientesObtenidos; // Actualiza el dataSource aquí
      console.log(this.clientes);
    });
  }
  
  //Animaciones----------------------------------------------------------------------------

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(event: { active: string; direction: string }): void {
    const data = this.dataSource.data.slice();
    if (!event.active || event.direction === '') {
      this.dataSource.data = data;
      return;
    }
  
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'nombre': return this.compare(a.persona.nombre, b.persona.nombre, isAsc); 
        default:
          return 0;
      }
    });
  }
  
  private compare(a: number | String, b: number | String, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

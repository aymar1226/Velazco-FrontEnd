import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo, Empleado, Persona, PersonaUsuarioDTO, Usuario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }


  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>('http://localhost:8080/api/empleados/lista')
  }


  getCargos(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>('http://localhost:8080/api/empleados/cargo/lista')
  }

  agregarPersonal(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>('http://localhost:8080/api/empleados/agregar',empleado);
  }
  

  crearUsuariOAPersonal(usuarioDTO:PersonaUsuarioDTO){
    return this.http.post<PersonaUsuarioDTO>('http://localhost:8080/api/empleados/crearusuario',usuarioDTO)
  }

  eliminarEmpleado(empleado: Empleado):Observable<Empleado>{
    return this.http.put<Empleado>('http://localhost:8080/api/empleados/delete',empleado);

  }



}

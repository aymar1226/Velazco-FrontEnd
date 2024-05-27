import { Injectable } from '@angular/core';
import { Proveedor } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>('http://localhost:8080/api/proveedores/lista')
  }

  agregarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>('http://localhost:8080/api/proveedores/agregar',proveedor);
  }

  editarProveedores(proveedor:Proveedor):Observable<Proveedor>{
    return this.http.put<Proveedor>('http://localhost:8080/api/proveedores/update', proveedor);
  }

  eliminarProveedor(proveedor: Proveedor):Observable<Proveedor>{
    return this.http.put<Proveedor>('http://localhost:8080/api/proveedores/delete',proveedor);

  }


}

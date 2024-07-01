import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleOrden, Orden } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/ordenes';


  constructor(private http: HttpClient) {
   }

   listarOrdenesPorUsuario(): Observable<Orden[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Orden[]>(`${this.apiUrl}/lista`, { headers });
  }

  listarDetalles(id:number): Observable<DetalleOrden[]> {

    return this.http.get<DetalleOrden[]>(`${this.apiUrl}/detalles/${id}`);
  }

  eliminarPedido(id:number): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/delete/usuario/${id}`,null);
  }


}

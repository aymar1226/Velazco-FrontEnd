import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritoItem, ProductoDTO } from '../model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api/carrito';



  guardarItem(producto: ProductoDTO): Observable<CarritoItem> {
    const correo = localStorage.getItem('email');
    const url = `${this.apiUrl}/item/crear`;
    const body = { correo, producto };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<CarritoItem>(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
  

  getItems(correo: string): Observable<CarritoItem[]> {
    const url = `${this.apiUrl}/item/lista/${correo}`;
    return this.http.get<CarritoItem[]>(url);
  }

  deleteItem(id: number): Observable<void> {
    const url = `${this.apiUrl}/item/eliminar/${id}`;
    return this.http.delete<void>(url);
  }

  updateCarrito(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/update`;

    return this.http.put(url, {}, { headers });
  }
  
}

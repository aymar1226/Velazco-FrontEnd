import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarritoItem, ProductoDTO } from '../model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }




  guardarItem( producto: ProductoDTO): Observable<CarritoItem> {
    const correo = localStorage.getItem('email'); 
    const url = 'http://localhost:8080/api/carrito/item/crear';
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
    const url = `http://localhost:8080/api/carrito/item/lista/${correo}`;
    return this.http.get<CarritoItem[]>(url);
  }

  deleteItem(id:number): Observable<void>{
    const url = `http://localhost:8080/api/carrito/item/eliminar/${id}`;
    return this.http.delete<void>(url);
  }
  
}

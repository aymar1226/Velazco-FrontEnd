import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Categoria, Producto } from '../model';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
    private sanitizer:DomSanitizer
  ) { }

  getProductosPorCategoria(id: number){
    return this.http.get<Producto[]>('http://localhost:8080/api/productos/menu/'+id);
  }
  
  obtenerImagenProducto(id: number): Observable<Blob> {

    return this.http.get('http://localhost:8080/api/productos/imagen/' + id, { responseType: 'blob' });
  }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('http://localhost:8080/api/categorias/lista')
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('http://localhost:8080/api/productos/lista')
  }
  
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>('http://localhost:8080/api/productos/agregar',producto);
  }


  getProductobyId(id:number):Observable<Producto>{
    return this.http.get<Producto>('http://localhost:8080/api/productos/'+id);
  }
  


  editarProducto(id:number, producto:Producto):Observable<any>{
    return this.http.put<number>('http://localhost:8080/api/productos/update/'+id, producto);
  }

  eliminarProducto(id:number):Observable<any>{
    return this.http.put<number>('http://localhost:8080/api/productos/delete/'+id,{});
  }
  


  //guardar imagen en el servidor
  uploadFile(formData: FormData): Observable<any>{
    return this.http.post('http://localhost:8080/media/upload', formData);
  }

  extraerbase64 = async($event:any) => new Promise((resolve, reject)=>{
    try{
      const unsafeimg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeimg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
    }catch(e){
      reject(e);
    }
  })

}

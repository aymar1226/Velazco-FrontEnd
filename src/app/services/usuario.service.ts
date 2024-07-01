import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import baserUrl from './helper';
import { Carrito, Cliente, Credentials, Empleado, InfoDTO, PersonaUsuarioDTO, Privilegio, Proveedor, RegistroDTO, Usuario } from '../model';
import { Observable, map } from 'rxjs';
import jwt_decode, { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http: HttpClient) { }
  

//  public añadirUsuario(user:any){
//    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
//  }

  login(creds: Credentials){
    console.log(creds);
    return this.http.post('http://localhost:8080/login', creds,{
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      console.log(body);

      const headers = response.headers;
      console.log(headers);


      const bearerToken = headers.get('Authorization')!;
      console.log(bearerToken);


      const token = bearerToken.replace('Bearer ','');
      console.log(token);

      
      localStorage.setItem('token', token);
      this.getEmailFromToken(token);

      return body;
    }))
  }
  
  registrarUsuario(registroDTO:RegistroDTO){
    return this.http.post<RegistroDTO>('http://localhost:8080/api/usuarios/registrar',registroDTO);
  }

  eliminarUsuario(usuario: Usuario){
    return this.http.put<Usuario>('http://localhost:8080/api/usuarios/delete',usuario);

  }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://localhost:8080/api/usuarios/lista')
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes/lista')
  }

  getPrivilegios(): Observable<Privilegio[]>{
    return this.http.get<Privilegio[]>('http://localhost:8080/api/usuarios/privilegio/lista')
  }

 

  getUsuarioByCorreo(correo: String): Observable<Usuario> {
    const url = `http://localhost:8080/api/usuarios/email/${correo}`;
    return this.http.get<Usuario>(url);
  }

  getPrivilegioByCorreo(correo: String): Observable<Privilegio> {
    const url = `http://localhost:8080/api/usuarios/privilegio/${correo}`;
    return this.http.get<Privilegio>(url);
  }

  canmbiarPrivilegio(personaDTO: PersonaUsuarioDTO){
    return this.http.put<PersonaUsuarioDTO>("http://localhost:8080/api/usuarios/cambioprivilegio",personaDTO)
  }

  
  crearCarrito(correo: String): Observable<any> {
    const url = `http://localhost:8080/api/carrito/crear/${correo}`;
    return this.http.post(url, null);
  }
  

  getEmailFromToken(token:any): string | null {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      localStorage.setItem('email', decodedToken.email);
      localStorage.setItem('rol', decodedToken.roles)
      return decodedToken.email;
    }else{
      localStorage.removeItem('email')
    }
    return null
  }

  getRolFromToken(token:any): string | null {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      localStorage.setItem('rol', decodedToken.roles)
      return decodedToken.roles;
    }else{
      localStorage.removeItem('email')
    }
    return null
  }
  
  
  getToken(){
    return localStorage.getItem('token');
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  getRol(){
    return localStorage.getItem('rol');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getInfo(): Observable<InfoDTO>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<InfoDTO>(`http://localhost:8080/api/clientes/info`, { headers });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<boolean> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.http.put<boolean>(`http://localhost:8080/api/usuarios/cambio-contrasena`, body, { headers });
  }
}

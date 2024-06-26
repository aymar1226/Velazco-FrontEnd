import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import jwt_decode, { jwtDecode } from 'jwt-decode';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.usuarioService.getToken();
    this.usuarioService.getEmailFromToken(token);
    if(token){

      const cloned = request.clone({
        headers: request.headers.set('Authorization',`Bearer ${token}`)
      })

      return next.handle(cloned);
    }
    return next.handle(request);
  }


}

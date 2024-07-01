import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router)
    {}

    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {

      const publicRoutes = ['/productos', '/informacion'];
      const isPublicRoute = publicRoutes.some(route => state.url.includes(route));
    
      try {
        const token = await this.usuarioService.getToken();
    
        if (!token && isPublicRoute) {
          // Permitir acceso a la ruta de productos sin token
          localStorage.removeItem('email');
          localStorage.removeItem('rol'); 
          return true;
        }
    
        if (token) {
          const email = await this.usuarioService.getEmail();
          const rol = await this.usuarioService.getRol();
          const emailverify = this.usuarioService.getEmailFromToken(token);
          const rolverify = this.usuarioService.getRolFromToken(token);
    
          if (emailverify && rolverify) {
            if (email !== emailverify) {
              localStorage.setItem('email', emailverify);
            }
            if (rol !== rolverify) {
              localStorage.setItem('rol', rolverify);
            }
            return true;
          } else {
            // Token inválido, limpiar localStorage
            this.usuarioService.removeToken();
            localStorage.removeItem('email');
            localStorage.removeItem('rol');
            
            if (isPublicRoute) {
              return true;
            }
            this.router.navigate(['login']);
            return false;
          }
        }
    
        // No hay token y no es la ruta de productos
        this.router.navigate(['login']);
        return false;
    
      } catch (error) {
        console.error('Error al obtener el token:', error);
        if (isPublicRoute) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }
    }
}

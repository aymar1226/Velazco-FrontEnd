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
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      try{
        const token = await this.usuarioService.getToken();
        const email = await this.usuarioService.getEmail();
        const emailverify = this.usuarioService.getEmailFromToken(token)

        
        if(token && emailverify){
          
          if(email!=emailverify){
            localStorage.setItem('email',emailverify);
          }

          return true;
        }
        this.router.navigate(['login']) 
        this.usuarioService.removeToken();
        return false;
      }catch(error){
        console.error('Error al obtener el token:', error);
      this.router.navigate(['login']);
      return false;
      }
  }
}

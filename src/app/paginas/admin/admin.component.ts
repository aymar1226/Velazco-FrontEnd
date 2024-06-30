import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isHandset$: Observable<boolean>;

  menuAbierto: boolean = false;



  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit() {
  }


  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  toggleVolver(): void {
    this.router.navigate(['/inicio']);
  }

  togglePerfil(): void {
    this.router.navigate(['/inicio/perfil/profile'])
  }







}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simulamos una carga de 3 segundos antes de redirigir a la página de inicio de sesión
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

}

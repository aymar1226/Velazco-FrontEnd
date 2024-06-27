import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { InformacionComponent } from './paginas/informacion/informacion.component';
import { PruebaComponent } from './paginas/prueba/prueba.component';
import { IndexComponent } from './paginas/index/index.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProductoComponent } from './paginas/producto/producto.component';
import { CrudProductosComponent } from './paginas/admin/crud-productos/crud-productos.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { CrearProductoComponent } from './paginas/admin/crud-productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './paginas/admin/crud-productos/editar-producto/editar-producto.component';
import { CrearUsuarioComponent } from './paginas/admin/crud-usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './paginas/admin/crud-usuarios/editar-usuario/editar-usuario.component';
import { OrdenComponent } from './paginas/orden/orden.component';
import { PagoComponent } from './paginas/pago/pago.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/informacion',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'inicio',
    component: InicioComponent,
    children: [
      { path: '', component: ProductoComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'orden', component: OrdenComponent },
      { path: 'pago', component: PagoComponent }
    ]
  },

  {
    path: 'inicio/:mostrarBotonInicioSesion',
    component: InicioComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'informacion',
    component: InformacionComponent,

  },
  {
    path: 'prueba',
    component: PruebaComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: ProductoComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/productos',
    component: CrudProductosComponent,
    canActivate: [AuthGuard]
  },
  { path: 'perfil', 
    component: PerfilComponent,
  },
  {
    path: 'crear/producto',
    component: CrearProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar/producto',
    component: EditarProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crear/usuario',
    component: CrearUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar/usuario',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

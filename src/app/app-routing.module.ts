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
import { PaymentComponent } from './paginas/carrito/payment/payment/payment.component';
import { ProfileComponent } from './paginas/perfil/profile/profile.component';
import { PedidosComponent } from './paginas/perfil/pedidos/pedidos.component';
import { AjustesContraComponent } from './paginas/perfil/ajustes-contra/ajustes-contra.component';
import { CrudUsuariosComponent } from './paginas/admin/crud-usuarios/crud-usuarios.component';
import { CrudEmpleadosComponent } from './paginas/admin/crud-empleados/crud-empleados.component';
import { CrudClientesComponent } from './paginas/admin/crud-clientes/crud-clientes.component';
import { CrudProveedoresComponent } from './paginas/admin/crud-proveedores/crud-proveedores.component';

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
      { path: 'pago', component: PagoComponent },
      {
        path: 'perfil', component: PerfilComponent,
        children: [
          { path: '', component: ProfileComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'pedidos', component: PedidosComponent },
          { path: 'modificacion', component: AjustesContraComponent }
        ]
      }
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'inicio/:mostrarBotonInicioSesion',
    component: InicioComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'informacion',
    component: InformacionComponent,
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CrudUsuariosComponent },
      { path: 'usuarios', component: CrudUsuariosComponent },
      { path: 'empleados', component: CrudEmpleadosComponent },
      { path: 'clientes', component: CrudClientesComponent },
      { path: 'productos', component: CrudProductosComponent },
      { path: 'proveedores', component: CrudProveedoresComponent },
    ]
  },
  {
    path: 'admin/productos',
    component: CrudProductosComponent,
    canActivate: [AuthGuard]
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
  {
    path:'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

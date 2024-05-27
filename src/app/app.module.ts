import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { InformacionComponent } from './paginas/informacion/informacion.component';
import { PruebaComponent } from './paginas/prueba/prueba.component';
import { IndexComponent } from './paginas/index/index.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ProductoComponent } from './paginas/producto/producto.component';
import { CrudProductosComponent } from './paginas/admin/crud-productos/crud-productos.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { CrearProductoComponent } from './paginas/admin/crud-productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './paginas/admin/crud-productos/editar-producto/editar-producto.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CrudUsuariosComponent } from './paginas/admin/crud-usuarios/crud-usuarios.component';
import { CrearUsuarioComponent } from './paginas/admin/crud-usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './paginas/admin/crud-usuarios/editar-usuario/editar-usuario.component';
import { CrudClientesComponent } from './paginas/admin/crud-clientes/crud-clientes.component';
import { CrearClienteComponent } from './paginas/admin/crud-clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './paginas/admin/crud-clientes/editar-cliente/editar-cliente.component';
import { CrudEmpleadosComponent } from './paginas/admin/crud-empleados/crud-empleados.component';
import { CrearEmpleadoComponent } from './paginas/admin/crud-empleados/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './paginas/admin/crud-empleados/editar-empleado/editar-empleado.component';
import { CrudProveedoresComponent } from './paginas/admin/crud-proveedores/crud-proveedores.component';
import { CrearProveedorComponent } from './paginas/admin/crud-proveedores/crear-proveedor/crear-proveedor.component';
import { EditarProveedorComponent } from './paginas/admin/crud-proveedores/editar-proveedor/editar-proveedor.component';
import { CrearUsuarioEmpleadoComponent } from './paginas/admin/crud-empleados/crear-usuario-empleado/crear-usuario-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    InformacionComponent,
    PruebaComponent,
    IndexComponent,
    CarritoComponent,
    ProductoComponent,
    CrudProductosComponent,
    AdminComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CrudUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    CrudClientesComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    CrudEmpleadosComponent,
    CrearEmpleadoComponent,
    EditarEmpleadoComponent,
    CrudProveedoresComponent,
    CrearProveedorComponent,
    EditarProveedorComponent,
    CrearUsuarioEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { SeleccionarProductosComponent } from './components/seleccionar-productos/seleccionar-productos.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'seleccionproductos', component: SeleccionarProductosComponent }
  ];
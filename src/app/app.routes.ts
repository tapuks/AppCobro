import { Routes } from '@angular/router';
import { SeleccionarProductosComponent } from './components/seleccionar-productos/seleccionar-productos.component';
import { FacturaComponent } from './components/factura/factura.component';

export const routes: Routes = [
  { path: '', component: SeleccionarProductosComponent },
  { path: 'factura', component: FacturaComponent },
];

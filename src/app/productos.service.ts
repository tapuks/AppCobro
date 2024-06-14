import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './components/producto/producto.component';
import { productos } from './productos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  misProductos = JSON.parse(JSON.stringify(productos));

  todosLosProductos: BehaviorSubject<Producto[]> = new BehaviorSubject<
    Producto[]
  >(this.misProductos);

  constructor() {}
}

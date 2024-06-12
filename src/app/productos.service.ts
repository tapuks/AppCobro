import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './components/producto/producto.component';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
   misProductos: Producto[] = [
    {nombre:'Bravas', id:1, precio:5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Alitas', id:2, precio:6, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Agua pequeña', id:3, precio:1, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Carajillo', id:4, precio:2, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:5, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:6, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:7, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:8, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bravas', id:1, precio:5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Alitas', id:2, precio:6, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Agua pequeña', id:3, precio:1, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Carajillo', id:4, precio:2, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:5, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:6, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:7, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
    {nombre:'Bocadillo', id:8, precio:5.5, seleccionado: false, cantidad: 0, imagen:''},
   ]
  todosLosProductos: BehaviorSubject<Producto[]>= new BehaviorSubject<Producto[]>(this.misProductos)

  constructor() { }
}

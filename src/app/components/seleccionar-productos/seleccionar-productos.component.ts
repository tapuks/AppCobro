import { Component, OnInit } from '@angular/core';
import { Producto, ProductoComponent } from '../producto/producto.component';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-seleccionar-productos',
  standalone: true,
  imports: [ProductoComponent, CommonModule],
  templateUrl: './seleccionar-productos.component.html',
  styleUrl: './seleccionar-productos.component.scss'
})
export class SeleccionarProductosComponent implements OnInit {
  productos!: Producto[]

  constructor(private productosService: ProductosService){}
  ngOnInit(): void {
    this.productos = this.productosService.todosLosProductos.getValue()
  }

}

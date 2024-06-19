import { Component, OnInit } from '@angular/core';
import { Producto, ProductoComponent } from '../producto/producto.component';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../productos.service';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';

@Component({
  selector: 'app-seleccionar-productos',
  standalone: true,
  imports: [ProductoComponent, CommonModule, CrearProductoComponent],
  templateUrl: './seleccionar-productos.component.html',
  styleUrl: './seleccionar-productos.component.scss',
})
export class SeleccionarProductosComponent implements OnInit {
  productos!: Producto[];

  constructor(private productosService: ProductosService) {}
  ngOnInit(): void {
    this.productosService.todosLosProductos.subscribe((prod) => {
      this.productos = prod;
      console.log(this.hayIdRepetido(this.productos));
    });
  }

  hayIdRepetido(productos: Producto[]): boolean {
    const ids = new Set<number>();

    for (const producto of productos) {
      if (ids.has(producto.id)) {
        return true;
      }
      ids.add(producto.id);
    }

    return false;
  }
}

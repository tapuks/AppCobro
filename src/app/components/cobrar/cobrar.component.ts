import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Producto } from '../producto/producto.component';
import { ProductosService } from '../../productos.service';


@Component({
  selector: 'app-cobrar',
  standalone: true,
  imports: [InputNumberModule, FormsModule],
  templateUrl: './cobrar.component.html',
  styleUrl: './cobrar.component.scss'
})
export class CobrarComponent implements OnInit {
  valueMeDan= 0
  valueDevuelvo= 0
  productos!: Producto[];
  totalEuros!: number;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.todosLosProductos.subscribe((value) => {
      this.productos = value.filter((prod) => prod.seleccionado);
      this.calcularTotales();
    });
  }

  calcularTotales(): void {
    this.totalEuros = 0;
    for (const prod of this.productos) {
      this.totalEuros += prod.cantidad * prod.precio;
    }
  }

  manejoMedan(){
    if(this.valueMeDan  && this.valueMeDan > 0) {
      this.valueDevuelvo = this.valueMeDan-this.totalEuros

    }
    else {
      this.valueDevuelvo = 0
    }
  }

}

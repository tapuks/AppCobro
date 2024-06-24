import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto/producto.component';
import { ProductosService } from '../../productos.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { CobrarComponent } from '../cobrar/cobrar.component';
import { productos } from '../../productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-en-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TicketComponent,
    CobrarComponent,
  ],
  templateUrl: './productos-en-ticket.component.html',
  styleUrl: './productos-en-ticket.component.scss',
})
export class ProductosEnTicketComponent implements OnInit {
  productosEnTicket!: Producto[];
  dialogTicketVisible = false;
  dialogCobrarVisible = false;
  dialogNuevoTicketVisible = false;
  pulseCloseDialogCobrar = false;

  constructor(
    private productosService: ProductosService,
    public router: Router
  ) {}

  ngOnInit(): void {
    let productosSeleccionadosPrevios: any[] = [];

    this.productosService.todosLosProductos.subscribe((value) => {
      const productosSeleccionados = value.filter(
        (producto) => producto.seleccionado
      );

      // Encontramos los nuevos productos añadidos
      const nuevosProductos = productosSeleccionados.filter(
        (producto) =>
          !productosSeleccionadosPrevios.some((p) => p.id === producto.id)
      );

      // Añadimos los nuevos productos al final de productosEnTicket
      this.productosEnTicket = [
        ...productosSeleccionadosPrevios.filter((producto) =>
          productosSeleccionados.some((p) => p.id === producto.id)
        ),
        ...nuevosProductos,
      ];

      // Actualizamos la lista de productos seleccionados previos
      productosSeleccionadosPrevios = [...productosSeleccionados];
    });
  }

  confirmarNuevoTicket(): void {
    this.productosService.todosLosProductos.next(
      JSON.parse(JSON.stringify(productos))
    );
    this.dialogNuevoTicketVisible = false;
  }
}

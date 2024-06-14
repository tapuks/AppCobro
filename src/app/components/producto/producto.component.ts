import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProductosService } from '../../productos.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface Producto {
  nombre: string;
  id: number;
  precio: any;
  seleccionado: boolean;
  cantidad: number;
  imagen: string;
  category:
    | 'comida'
    | 'refresco'
    | 'cafe'
    | 'licor'
    | 'postre'
    | 'extra'
    | 'patatas';
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
})
export class ProductoComponent {
  constructor(
    private router: Router,
    private productosService: ProductosService,
    private confirmationService: ConfirmationService
  ) {}
  dialogVisible = false;
  cantidad = 0;
  @Input() producto!: Producto;
  @Output() emitirProducto = new EventEmitter<number>();

  cancelar(): void {
    const productos = this.productosService.todosLosProductos.getValue();
    let index = productos.findIndex(
      (producto) => producto.id === this.producto.id
    );
    if (index !== -1) {
      productos[index].cantidad = 0;
      productos[index].seleccionado = false;
    }
    if (this.cantidad === 0) {
      this.cantidad = 0;
      this.productosService.todosLosProductos.next(productos);
      this.dialogVisible = false;
    } else {
      this.cancelarSeguro();
    }

    console.log(productos);
  }

  confirmar(): void {
    const productos = this.productosService.todosLosProductos.getValue();
    let index = productos.findIndex(
      (producto) => producto.id === this.producto.id
    );
    if (index !== -1) {
      productos[index].cantidad = this.cantidad;
      productos[index].seleccionado = true;
      this.productosService.todosLosProductos.next(productos);
    }

    this.dialogVisible = false;
  }

  cancelarSeguro(): void {
    this.confirmationService.confirm({
      message:
        '¿Estas seguro que desea eliminar los ' +
        this.cantidad +
        ' productos de ' +
        this.producto.nombre,
      header: 'Cancelar productos',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        console.log('siii');
        const productos = this.productosService.todosLosProductos.getValue();
        let index = productos.findIndex(
          (producto) => producto.id === this.producto.id
        );
        productos[index].cantidad = 0;
        productos[index].seleccionado = false;

        this.cantidad = 0;
        this.productosService.todosLosProductos.next(productos);
        this.dialogVisible = false;
      },
      reject: () => {},
    });
  }

  twoDecimals(num: number): string {
    return num.toFixed(2);
  }
}

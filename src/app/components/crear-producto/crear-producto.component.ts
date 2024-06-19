import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
})
export class CrearProductoComponent {
  constructor(private productosService: ProductosService) {}

  dialogNewProductVisible = false;
  newProductForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl(0, [Validators.required]),
  });

  cancelar(): void {
    this.dialogNewProductVisible = false;
  }

  confirmar(): void {
    const productos = this.productosService.todosLosProductos.getValue();
    productos.push({
      nombre: this.newProductForm.value.nombre ?? '',
      id: Math.floor(Math.random() * 900000) + 100,
      precio: this.newProductForm.value.precio,
      seleccionado: false,
      cantidad: 0,
      imagen: '',
      category: 'extra',
    });
    this.productosService.todosLosProductos.next([...productos]);
    this.dialogNewProductVisible = false;
  }

  openDialogNewProduct(): void {
    this.newProductForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl(0, [Validators.required]),
    });
    this.dialogNewProductVisible = true;
  }
}

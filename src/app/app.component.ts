import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketComponent } from './components/ticket/ticket.component';
import { HomeComponent } from './components/home/home.component';
import { SeleccionarProductosComponent } from './components/seleccionar-productos/seleccionar-productos.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosEnTicketComponent } from './components/productos-en-ticket/productos-en-ticket.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TicketComponent, HomeComponent, SeleccionarProductosComponent, ProductosEnTicketComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cobro';
}

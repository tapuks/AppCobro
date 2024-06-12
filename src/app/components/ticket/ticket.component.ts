import { Component } from '@angular/core';
import { Producto } from '../producto/producto.component';
import { ProductosService } from '../../productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
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

  printTicket() {
    const printContents = document.getElementById('ticket-content')?.innerHTML;
    if (printContents) {
      const printWindow = document.createElement('iframe');
      // printWindow.name = 'printFrame';
      printWindow.style.position = 'absolute';
      printWindow.style.width = '0';
      printWindow.style.height = '0';
      // printWindow.style.border = 'none';

      document.body.appendChild(printWindow);

      const printDocument =
        printWindow.contentDocument || printWindow.contentWindow?.document;
      if (printDocument) {
        printDocument.open();
        printDocument.write(`
          <html>
            <head>
              <title></title>
              <style>
                /* Aquí puedes añadir estilos adicionales para el contenido del ticket */
                body {
                  margin: 0;
                  padding: 0;
                }
                  #ticket-content {
    font-family: Arial, sans-serif;

  }
  
  .text-center {
    text-align: center;
  }
  
  .ticket-products {
    width: 100%;
    border-collapse: collapse; /* Combina los bordes de las celdas de la tabla */
  }
  
  .product-row.header td {
    font-weight: bold;
    border-bottom: 1px solid black !important;
     border-top: 1px solid black !important;
  }
  
  .product-row td {
    padding: 3px;
    font-size:12px;
    // border: 1px solid #ddd;
  }

  .title {
    font-family: "Gwendolyn", cursive; /* Aplica la fuente Gwendolyn */
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;

  }
       .product-row.total td {
    font-weight: bold;
    border-top: 1px solid black !important;
    padding: 10px;
  }
  .text-right {
    text-align: right;
  }

    .product-row.total .text-left {
    padding-left: 25px;
  }
  
  .product-row.total .text-right {
    padding-right: 25px;
  }

   .container_nif p {
    font-size:11px;
    padding: 0;
    margin: 0;
  }

  .mt-5 {
  margin-top: 40px;
  }

    .gracias {
    text-align: center;
    font-size: 11px;
   padding: 30px !important;
  }
              </style>
            </head>
            <body>${printContents}</body>
          </html>
        `);
        printDocument.close();

        printWindow.onload = () => {
          printWindow.contentWindow?.print();
          document.body.removeChild(printWindow);
        };
      } else {
        console.error(
          'No se pudo acceder al documento del iframe para la impresión.'
        );
      }
    } else {
      console.error('El contenido del ticket no se pudo encontrar.');
    }
  }

  convertirAMayusculas(texto: string): string {
    return texto.toUpperCase();
  }
}

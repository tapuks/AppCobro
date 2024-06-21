import { Component } from '@angular/core';
import { Producto } from '../producto/producto.component';
import { ProductosService } from '../../productos.service';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  fechaHoy!: string;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.todosLosProductos.subscribe((value) => {
      this.productos = value.filter((prod) => prod.seleccionado);
      this.calcularTotales();

      this.fechaHoy = this.obtenerFechaActual();
    });
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  calcularTotales(): void {
    this.totalEuros = 0;
    for (const prod of this.productos) {
      this.totalEuros += prod.cantidad * prod.precio;
    }
  }

  printTicket() {
    this.downloadPDF();
    const printContents = document.getElementById('ticket-content')?.innerHTML;
    if (printContents) {
      const printWindow = document.createElement('iframe');
      // printWindow.name = 'printFrame';
      printWindow.style.position = 'absolute';
      printWindow.style.width = '0';
      printWindow.style.height = '0';
      // printWindow.style.border = 'none';5

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

  getFormattedDate(): string {
    const date = new Date();
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getUTCFullYear().toString();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${day}_${month}_${year}_${hours}_${minutes}_${seconds}_${this.totalEuros}`;
  }

  getDate(): string {
    const date = new Date();
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getUTCFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  public downloadPDF(): void {
    const DATA: any = document.getElementById('ticket-content');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      const imgProps = PDF.getImageProperties(FILEURI);
      const pdfWidth = PDF.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      PDF.addImage(FILEURI, 'PNG', 0, position, pdfWidth, pdfHeight);
      const fileName = `ticket_${this.getFormattedDate()}.pdf`;
      PDF.save(fileName);
    });
  }
}

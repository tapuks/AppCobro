import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss',
})
export class FacturaComponent {
  menuDiario = [
    { fecha: '11/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '12/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '13/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '14/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '15/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '16/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '17/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '18/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '19/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '20/06/2024', descripcion: 'MENU DIARIO', precio: '25.00€' },
    { fecha: '21/06/2024', descripcion: 'MENU DIARIO', precio: '26.30€' },
  ];

  name1 = 'Agropelegry';
  name2 = 'Enrique';

  subtotal(): string {
    return this.menuDiario
      .reduce(
        (acc, item) => acc + parseFloat(item.precio.replace('€', '').trim()),
        0
      )
      .toFixed(2);
  }

  iva(): string {
    const subtotal = this.menuDiario.reduce(
      (acc, item) => acc + parseFloat(item.precio.replace('€', '').trim()),
      0
    );
    const iva = subtotal * 0.1; // Asumiendo un IVA del 21%
    return iva.toFixed(2);
  }

  totalConIVA(): string {
    const subtotalNum = parseFloat(this.subtotal());
    const ivaNum = parseFloat(this.iva());
    const total = subtotalNum + ivaNum;
    return total.toFixed(2);
  }

  public downloadPDF(): void {
    const DATA: any = document.getElementById('factura');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const margin = 10; // Margen original en milímetros
      const doubleMargin = margin * 2; // Doble del margen para izquierda y derecha
      const marginTop = 20; // Margen superior en milímetros
      const imgProps = PDF.getImageProperties(FILEURI);
      // Ajusta el ancho para incluir el doble de margen a ambos lados
      const pdfWidth = PDF.internal.pageSize.getWidth() - doubleMargin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Ajusta la posición de la imagen para incluir el doble de margen izquierdo y el margen superior
      PDF.addImage(
        FILEURI,
        'PNG',
        doubleMargin,
        marginTop,
        pdfWidth,
        pdfHeight
      );
      const fileName = `Factura_${this.name2}_${this.getDate()}.pdf`;
      PDF.save(fileName);
    });
  }

  getDate(): string {
    const date = new Date();
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getUTCFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}

import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BehaviorSubject } from 'rxjs';

export interface Ticket {
  productos: { nombre: string; cantidad: number; precio: number }[];
  total: number;
  metodoPago: string;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];
  tickets$ = new BehaviorSubject<Ticket[]>([]);

  constructor() {}

  async generarTicket(pedido: any[], total: number, metodo: string) {
    const fecha = new Date();

    const ticket: Ticket = { productos: pedido, total, metodoPago: metodo, fecha };
    this.tickets.push(ticket);
    this.tickets$.next(this.tickets);

    const pdf = new jsPDF();

    const logoSereno = await this.cargarImagenBase64('assets/sereno.png').catch(()=>null);
    const logoGelato = await this.cargarImagenBase64('assets/gelato.png').catch(()=>null);

    if (logoSereno) pdf.addImage(logoSereno, 'PNG', 10, 6, 28, 28);
    if (logoGelato) pdf.addImage(logoGelato, 'PNG', 170, 6, 28, 28);

    pdf.setFontSize(16);
    pdf.text('Ticket de compra - Sereno', 80, 18);

    pdf.setFontSize(11);
    pdf.text(`Método: ${metodo}`, 14, 36);
    pdf.text(`Fecha: ${fecha.toLocaleString()}`, 14, 42);

    const filas = pedido.map(p => [p.nombre, String(p.cantidad), `$ ${Number(p.precio).toFixed(2)}`]);

    autoTable(pdf as any, {
      head: [['Producto', 'Cant', 'Precio']],
      body: filas,
      startY: 48,
      styles: { fontSize: 10 }
    });

    const finalY = (pdf as any).lastAutoTable?.finalY || 48 + (filas.length * 8);

    pdf.setFontSize(13);
    pdf.text(`Total: $ ${total.toFixed(2)}`, 14, finalY + 12);
    pdf.setFontSize(11);
    pdf.text('¡Gracias por la compra en Sereno!', 14, finalY + 22);

    pdf.save(`ticket_sereno_${Date.now()}.pdf`);
  }

  cargarImagenBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject('error loading image ' + url);
    });
  }
}

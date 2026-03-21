import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Asiento } from '../../core/models/asiento/asiento.model';
import * as QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent implements OnInit, AfterViewInit {

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  funcion: Funcion | null = null;
  asientos: Asiento[] = [];
  tiposConCantidad: any[] = [];
  carrito: any[] = [];
  total: number = 0;
  metodo: string = '';
  invitado: any = null;
  compraId: string = '';
  codigoQr: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state) {
      this.funcion = state.funcion || null;
      this.asientos = state.asientos || [];
      this.tiposConCantidad = state.tiposConCantidad || [];
      this.carrito = state.carrito || [];
      this.total = state.total || 0;
      this.metodo = state.metodo || '';
      this.invitado = state.invitado || null;
      this.compraId = state.compraId ? 'CG-' + new Date().getFullYear() + '-' + String(state.compraId).padStart(5, '0') : '';
      this.codigoQr = state.codigoQr || '';
    }

    if (!this.compraId) {
      this.compraId = 'CG-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 99999)).padStart(5, '0');
    }

    if (!this.codigoQr) {
      this.codigoQr = 'CINEGALAXY-' + this.compraId;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.qrCanvas?.nativeElement) {
      QRCode.toCanvas(this.qrCanvas.nativeElement, this.codigoQr, {
        width: 80,
        margin: 1,
        color: { dark: '#111111', light: '#ffffff' }
      });
    }
  }

  getAsientosTexto(): string {
    return this.asientos.map(a => `${a.fila}${a.numero}`).join(', ');
  }

  getMetodoTexto(): string {
    return this.metodo === 'tarjeta' ? '💳 Pagado con tarjeta' : '📱 Pagado con Yape/Plin';
  }

  irInicio(): void {
    this.router.navigate(['/inicio']);
  }

  irCartelera(): void {
    this.router.navigate(['/cartelera']);
  }

  descargarTicket(): void {
  const ticket = document.querySelector('.ticket') as HTMLElement;
  html2canvas(ticket, { scale: 2, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 180;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);
    pdf.save(`ticket-${this.compraId}.pdf`);
  });
  }
}
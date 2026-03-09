import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Asiento } from '../../core/models/asiento/asiento.model';
import { TipoEntrada } from '../../core/models/tipo-entrada/tipo-entrada.model';
import { TipoEntradaService } from '../../core/services/tipo-entrada/tipo-entrada.service';

interface TipoConCantidad {
  tipo: TipoEntrada;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-tipo-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tipo-entrada.component.html',
  styleUrl: './tipo-entrada.component.css'
})
export class TipoEntradaComponent implements OnInit {

  funcion!: Funcion;
  asientos: Asiento[] = [];
  tiposConCantidad: TipoConCantidad[] = [];

  constructor(
    private router: Router,
    private tipoEntradaService: TipoEntradaService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { funcion: Funcion; asientos: Asiento[] };
    if (state) {
      this.funcion = state.funcion;
      this.asientos = state.asientos;
    }
  }

  ngOnInit(): void {
    this.tipoEntradaService.getTiposEntrada().subscribe({
      next: (tipos) => {
        this.tiposConCantidad = tipos
          .filter(t => t.estado === 1)
          .map(t => ({
            tipo: t,
            cantidad: 0,
            precioUnitario: this.funcion.precioBase * (1 - t.descuentoPct / 100),
            subtotal: 0
          }));
      },
      error: (err) => console.error('Error al obtener tipos de entrada:', err)
    });
  }

  getTotalAsignadas(): number {
    return this.tiposConCantidad.reduce((s, t) => s + t.cantidad, 0);
  }

  getProgresoPct(): number {
    return (this.getTotalAsignadas() / this.asientos.length) * 100;
  }

  getTotal(): number {
    return this.tiposConCantidad.reduce((s, t) => s + t.subtotal, 0);
  }

  todosAsignados(): boolean {
    return this.getTotalAsignadas() === this.asientos.length;
  }

  aumentar(item: TipoConCantidad): void {
    if (this.getTotalAsignadas() >= this.asientos.length) return;
    item.cantidad++;
    item.subtotal = item.precioUnitario * item.cantidad;
  }

  disminuir(item: TipoConCantidad): void {
    if (item.cantidad === 0) return;
    item.cantidad--;
    item.subtotal = item.precioUnitario * item.cantidad;
  }

  getResumen(): string {
    const partes = this.tiposConCantidad
      .filter(t => t.cantidad > 0)
      .map(t => `${t.cantidad} ${t.tipo.nombre}`);
    return partes.length > 0 ? partes.join(' · ') : 'Ninguna entrada asignada aún';
  }

  formatearFecha(fecha: string): string {
    const dias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const d = new Date(fecha + 'T00:00:00');
    return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
  }

  continuar(): void {
    this.router.navigate(['/dulceria'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientos,
        tiposConCantidad: this.tiposConCantidad,
        total: this.getTotal()
      }
    });
  }

  volver(): void {
    this.router.navigate(['/seleccion-asientos', this.funcion.funcionId], {
      state: { funcion: this.funcion, asientos: this.asientos }
    });
  }
}
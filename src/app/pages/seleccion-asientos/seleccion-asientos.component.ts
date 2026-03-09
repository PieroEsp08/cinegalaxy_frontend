import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Asiento } from '../../core/models/asiento/asiento.model';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { AsientoService } from '../../core/services/asiento/asiento.service';
import { FuncionService } from '../../core/services/funcion/funcion.service';

@Component({
  selector: 'app-seleccion-asientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-asientos.component.html',
  styleUrl: './seleccion-asientos.component.css'
})
export class SeleccionAsientosComponent implements OnInit {

  funcion!: Funcion;
  asientos: Asiento[] = [];
  asientosSeleccionados: Asiento[] = [];
  filas: string[] = [];
  readonly MAX_ASIENTOS = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funcionService: FuncionService,
    private asientoService: AsientoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Carga la función
      this.funcionService.getFuncionById(Number(id)).subscribe({
        next: (data) => this.funcion = data,
        error: (err) => console.error('Error al obtener función:', err)
      });

      // Carga los asientos de la sala de esa función
      this.funcionService.getFuncionById(Number(id)).subscribe({
        next: (funcion) => {
          this.funcion = funcion;
          this.asientoService.getAsientosBySala(funcion.sala.salaId).subscribe({
            next: (asientos) => {
              this.asientos = asientos;
              // Extrae filas únicas ordenadas
              this.filas = [...new Set(asientos.map(a => a.fila))].sort();
            },
            error: (err) => console.error('Error al obtener asientos:', err)
          });
        },
        error: (err) => console.error('Error al obtener función:', err)
      });
    }
  }

  getAsientosDeFila(fila: string): Asiento[] {
    return this.asientos
      .filter(a => a.fila === fila)
      .sort((a, b) => a.numero - b.numero);
  }

  isSeleccionado(asiento: Asiento): boolean {
    return this.asientosSeleccionados.some(a => a.asientoId === asiento.asientoId);
  }

  toggleAsiento(asiento: Asiento): void {
    if (this.isSeleccionado(asiento)) {
      this.asientosSeleccionados = this.asientosSeleccionados.filter(
        a => a.asientoId !== asiento.asientoId
      );
    } else {
      if (this.asientosSeleccionados.length >= this.MAX_ASIENTOS) return;
      this.asientosSeleccionados.push(asiento);
    }
  }

  formatearFecha(fecha: string): string {
    const dias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const d = new Date(fecha + 'T00:00:00');
    return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
  }

  getAsientosLabel(): string {
    if (this.asientosSeleccionados.length === 0) return 'Ningún asiento seleccionado';
    return this.asientosSeleccionados
      .map(a => `${a.fila}${a.numero}`)
      .join(', ');
  }

  getTotalPrecio(): number {
    if (!this.funcion) return 0;
    return this.asientosSeleccionados.length * this.funcion.precioBase;
  }

  continuar(): void {
    this.router.navigate(['/tipo-entrada'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientosSeleccionados
      }
    });
  }

  volver(): void {
    this.router.navigate(['/seleccion-funcion', this.funcion.pelicula.peliculaId]);
  }
}
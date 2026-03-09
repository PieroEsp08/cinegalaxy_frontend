import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../../core/models/pelicula/pelicula.model';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Sede } from '../../core/models/sede/sede.model';
import { PeliculaService } from '../../core/services/pelicula/pelicula.service';
import { FuncionService } from '../../core/services/funcion/funcion.service';
import { SedeService } from '../../core/services/sede/sede.service';

@Component({
  selector: 'app-seleccion-funcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-funcion.component.html',
  styleUrl: './seleccion-funcion.component.css'
})
export class SeleccionFuncionComponent implements OnInit {

  pelicula!: Pelicula;
  sedes: Sede[] = [];
  todasLasFunciones: Funcion[] = [];
  fechasDisponibles: string[] = [];
  funcionesFiltradas: Funcion[] = [];

  sedeSeleccionada!: Sede;
  fechaSeleccionada: string = '';
  funcionSeleccionada!: Funcion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService,
    private funcionService: FuncionService,
    private sedeService: SedeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Carga película
      this.peliculaService.getPeliculaById(Number(id)).subscribe({
        next: (data) => this.pelicula = data,
        error: (err) => console.error('Error al obtener película:', err)
      });

      // Carga todas las funciones de la película para extraer sedes únicas
      this.funcionService.getFuncionesByPelicula(Number(id)).subscribe({
        next: (data) => {
          this.todasLasFunciones = data;
          // Extrae sedes únicas de las funciones disponibles
          const sedeMap = new Map<number, Sede>();
          data.forEach(f => {
            if (!sedeMap.has(f.sala.sede.sedeId)) {
              sedeMap.set(f.sala.sede.sedeId, f.sala.sede);
            }
          });
          this.sedes = Array.from(sedeMap.values());
          // Auto-selecciona la primera sede y primera fecha
          if (this.sedes.length > 0) {
            this.seleccionarSede(this.sedes[0]);
            if (this.fechasDisponibles.length > 0) {
              this.seleccionarFecha(this.fechasDisponibles[0]);
            }
          }
        },
        error: (err) => console.error('Error al obtener funciones:', err)
      });
    }
  }

  seleccionarSede(sede: Sede): void {
    this.sedeSeleccionada = sede;
    this.fechaSeleccionada = '';
    this.funcionSeleccionada = null!;
    this.funcionesFiltradas = [];

    const funcionesDeSede = this.todasLasFunciones.filter(
      f => f.sala.sede.sedeId === sede.sedeId
    );
    this.fechasDisponibles = [...new Set(funcionesDeSede.map(f => f.fecha))].sort();

    if (this.fechasDisponibles.length > 0) {
      this.seleccionarFecha(this.fechasDisponibles[0]);
    }
  }

  seleccionarFecha(fecha: string): void {
    this.fechaSeleccionada = fecha;
    this.funcionSeleccionada = null!;

    this.funcionesFiltradas = this.todasLasFunciones.filter(
      f => f.sala.sede.sedeId === this.sedeSeleccionada.sedeId && f.fecha === fecha
    );
  }

  seleccionarFuncion(funcion: Funcion): void {
    this.funcionSeleccionada = funcion;
  }

  formatearFecha(fecha: string): string {
    const dias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const d = new Date(fecha + 'T00:00:00');
    return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`;
  }

  formatearHora(hora: string): string {
    return hora.substring(0, 5);
  }

  irASeleccionAsientos(): void {
    this.router.navigate(['/seleccion-asientos', this.funcionSeleccionada.funcionId]);
  }

  volver(): void {
    this.router.navigate(['/pelicula', this.pelicula.peliculaId]);
  }
}
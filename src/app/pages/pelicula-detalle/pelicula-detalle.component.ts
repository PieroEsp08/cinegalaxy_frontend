import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../../core/models/pelicula/pelicula.model';
import { PeliculaService } from '../../core/services/pelicula/pelicula.service';

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pelicula-detalle.component.html',
  styleUrl: './pelicula-detalle.component.css'
})
export class PeliculaDetalleComponent {

   pelicula!: Pelicula;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.peliculaService.getPeliculaById(Number(id))
        .subscribe({
          next: (data) => {
            this.pelicula = data;
          },
          error: (err) => console.error('Error al obtener película:', err)
        });
    }

  }

  irASeleccionFuncion(): void {
    this.router.navigate(['/seleccion-funcion', this.pelicula.peliculaId]);
  }


}

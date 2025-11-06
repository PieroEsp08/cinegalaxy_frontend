import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pelicula } from '../../../core/models/pelicula/pelicula.model';
import { PeliculaService } from '../../../core/services/pelicula/pelicula.service';
import { CardPeliculaComponent } from '../../../shared/components/card-pelicula/card-pelicula.component';



@Component({
  selector: 'app-peliculas-list',
  standalone: true,
  imports: [CommonModule,CardPeliculaComponent],
  templateUrl: './peliculas-list.component.html',
  styleUrl: './peliculas-list.component.css'
})
export class PeliculasListComponent {

  peliculas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService, private router: Router) {}

 ngOnInit(): void {
  this.peliculaService.getPeliculas().subscribe({
    next: (data) => {
      this.peliculas = data;
    },
    error: (err) => console.error('Error al obtener películas:', err)
  });
}

 irACartelera() {
    this.router.navigate(['/cartelera']);
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../core/models/pelicula/pelicula.model';
import { PeliculaService } from '../../core/services/pelicula/pelicula.service';
import { CardPeliculaComponent } from '../../shared/components/card-pelicula/card-pelicula.component';


@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule,CardPeliculaComponent],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.css'
})
export class CarteleraComponent {


  peliculas: Pelicula[] = [];
  
    constructor(private peliculaService: PeliculaService) {}
  
   ngOnInit(): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
      },
      error: (err) => console.error('Error al obtener películas:', err)
    });
  }
  

}

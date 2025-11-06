import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../core/models/pelicula/pelicula.model';


@Component({
  selector: 'app-card-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-pelicula.component.html',
  styleUrl: './card-pelicula.component.css'
})
export class CardPeliculaComponent {

  @Input() pelicula!: Pelicula;

}

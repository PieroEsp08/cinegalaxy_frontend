import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../core/models/pelicula/pelicula.model';


@Component({
  selector: 'app-card-pelicula',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './card-pelicula.component.html',
  styleUrl: './card-pelicula.component.css'
})
export class CardPeliculaComponent {

  @Input() pelicula!: Pelicula;

}

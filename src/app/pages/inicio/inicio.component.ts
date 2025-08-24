import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from "./carrusel/carrusel.component";


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CarruselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}

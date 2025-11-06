import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from "./carrusel/carrusel.component";
import { PeliculasListComponent } from "./peliculas-list/peliculas-list.component";
import { ProductosCarruselComponent } from "./productos-carrusel/productos-carrusel.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, CarruselComponent, PeliculasListComponent, ProductosCarruselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {



}

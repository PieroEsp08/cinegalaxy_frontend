import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit, OnDestroy {
 
  slideActual = 0;
  slides = [0, 1, 2, 3, 4];
  private intervalo: any;
 
  ngOnInit(): void {
    this.iniciarAutoplay();
  }
 
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
 
  iniciarAutoplay(): void {
    this.intervalo = setInterval(() => {
      this.cambiarSlide(1);
    }, 5000);
  }
 
  cambiarSlide(dir: number): void {
    this.slideActual = (this.slideActual + dir + this.slides.length) % this.slides.length;
  }
 
  irSlide(n: number): void {
    this.slideActual = n;
    clearInterval(this.intervalo);
    this.iniciarAutoplay();
  }
}
 
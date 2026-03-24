import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto/producto.model';

@Component({
  selector: 'app-carrusel-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() productos: Producto[] = [];
  @ViewChild('track') track!: ElementRef<HTMLElement>;

  slideActual = 0;
  desplazamiento = '0px';
  private intervalo: any;

  constructor(private cdr: ChangeDetectorRef) {}

  getVisible(): number {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  get maxSlide(): number {
    return Math.max(0, this.productos.length - this.getVisible());
  }

  get dots(): number[] {
    return Array.from({ length: this.maxSlide + 1 }, (_, i) => i);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.slideActual = Math.min(this.slideActual, this.maxSlide);
    this.actualizarDesplazamiento();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.actualizarDesplazamiento(), 100);
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  iniciarAutoplay(): void {
    this.intervalo = setInterval(() => {
      this.slideActual = this.slideActual >= this.maxSlide ? 0 : this.slideActual + 1;
      this.actualizarDesplazamiento();
    }, 4000);
  }

  actualizarDesplazamiento(): void {
    const card = this.track?.nativeElement?.querySelector('.producto-card') as HTMLElement;
    if (!card) return;
    const ancho = card.offsetWidth + 16;
    this.desplazamiento = `-${this.slideActual * ancho}px`;
    this.cdr.detectChanges();
  }

  cambiarSlide(dir: number): void {
    this.slideActual = Math.max(0, Math.min(this.slideActual + dir, this.maxSlide));
    this.actualizarDesplazamiento();
    clearInterval(this.intervalo);
    this.iniciarAutoplay();
  }

  irSlide(n: number): void {
    this.slideActual = n;
    this.actualizarDesplazamiento();
    clearInterval(this.intervalo);
    this.iniciarAutoplay();
  }
}
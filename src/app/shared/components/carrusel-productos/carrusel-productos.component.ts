import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto/producto.model';

@Component({
  selector: 'app-carrusel-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel-productos.component.html',
  styleUrl: './carrusel-productos.component.css'
})
export class CarruselProductosComponent {

  @Input() productos: Producto[] = [];
  productosAgrupados: Producto[][] = [];

  ngOnInit() {
    this.agruparProductos();
  }

  ngOnChanges() {
    this.agruparProductos(); // si los productos llegan después del init
  }

  private agruparProductos() {
    this.productosAgrupados = [];
    const size = 3; // <-- 3 productos por slide
    for (let i = 0; i < this.productos.length; i += size) {
      this.productosAgrupados.push(this.productos.slice(i, i + size));
    }
  }
  
}

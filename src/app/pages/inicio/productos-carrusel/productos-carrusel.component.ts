import { Component } from '@angular/core';
import { ProductoService } from '../../../core/services/producto/producto.service';
import { Producto } from '../../../core/models/producto/producto.model';
import { CarruselProductosComponent } from '../../../shared/components/carrusel-productos/carrusel-productos.component';


@Component({
  selector: 'app-productos-carrusel',
  standalone: true,
  imports: [CarruselProductosComponent],
  templateUrl: './productos-carrusel.component.html',
  styleUrl: './productos-carrusel.component.css'
})
export class ProductosCarruselComponent {

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
  this.productoService.getProductos().subscribe({
    next: (data: Producto[]) => {
      this.productos = data;
    },
    error: (err) => console.error('Error al obtener productos:', err)
  });
}

}

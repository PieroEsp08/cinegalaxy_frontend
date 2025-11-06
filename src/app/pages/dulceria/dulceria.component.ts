import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/models/producto/producto.model';
import { CategoriaProducto } from '../../core/models/categoria-producto/categoriaProducto.model';
import { ProductoService } from '../../core/services/producto/producto.service';
import { CategoriaProductoService } from '../../core/services/categoria-producto/categoria-producto.service';
import { CardProductoComponent } from '../../shared/components/card-producto/card-producto.component';



@Component({
  selector: 'app-dulceria',
  standalone: true,
  imports: [CommonModule, CardProductoComponent],
  templateUrl: './dulceria.component.html',
  styleUrl: './dulceria.component.css'
})
export class DulceriaComponent {

  categorias: CategoriaProducto[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {};
  
    constructor(private productoService: ProductoService, private categoriaProductoService: CategoriaProductoService) {}
  
   ngOnInit(): void {

      this.categoriaProductoService.getCategorias().subscribe({
        next: (categorias) => {
          this.categorias = categorias;

        // Traer productos de cada categoría
        categorias.forEach(categoria => {
          this.productoService.getProductosByCategoria(categoria.categoriaId).subscribe({
            next: (productos) => {
              this.productosPorCategoria[categoria.categoriaId] = productos;
            },
            error: (err) => console.error(`Error al obtener productos de ${categoria.nombre}:`, err)
          });
        });
      },
      error: (err) => console.error('Error al obtener categorías:', err)
    });
  }

  scrollToCategoria(nombre: string) {
  const id = nombre.replace(/\s+/g, '-'); // reemplaza espacios por guiones
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


  }



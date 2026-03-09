import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Asiento } from '../../core/models/asiento/asiento.model';
import { CategoriaProducto } from '../../core/models/categoria-producto/categoriaProducto.model';
import { Producto } from '../../core/models/producto/producto.model';
import { CategoriaProductoService } from '../../core/services/categoria-producto/categoria-producto.service';
import { ProductoService } from '../../core/services/producto/producto.service';

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-dulceria',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './dulceria.component.html',
  styleUrl: './dulceria.component.css'
})
export class DulceriaComponent implements OnInit {

  funcion: Funcion | null = null;
  asientos: Asiento[] = [];
  tiposConCantidad: any[] = [];
  totalEntradas: number = 0;

  categorias: CategoriaProducto[] = [];
  productosPorCategoria: { [catId: number]: Producto[] } = {};

  carrito: ItemCarrito[] = [];
  panelAbierto: boolean = false;

  constructor(
    private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      funcion: Funcion;
      asientos: Asiento[];
      tiposConCantidad: any[];
      total: number;
    };
    if (state) {
      this.funcion = state.funcion;
      this.asientos = state.asientos;
      this.tiposConCantidad = state.tiposConCantidad;
      this.totalEntradas = state.total;
    }
  }

  ngOnInit(): void {
    this.categoriaProductoService.getCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats.filter(c => c.estado === 1);
        this.categorias.forEach(cat => {
          this.productoService.getProductosByCategoria(cat.categoriaId).subscribe({
            next: (prods) => this.productosPorCategoria[cat.categoriaId] = prods,
            error: (err) => console.error(err)
          });
        });
      },
      error: (err) => console.error(err)
    });
  }

  scrollToCategoria(catId: number): void {
    const el = document.getElementById('sec-' + catId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  agregarProducto(producto: Producto): void {
    const item = this.carrito.find(i => i.producto.productoId === producto.productoId);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }
  }

  quitarProducto(productoId: number): void {
    const idx = this.carrito.findIndex(i => i.producto.productoId === productoId);
    if (idx === -1) return;
    this.carrito[idx].cantidad--;
    if (this.carrito[idx].cantidad === 0) {
      this.carrito.splice(idx, 1);
    }
  }

  getCantidad(productoId: number): number {
    return this.carrito.find(i => i.producto.productoId === productoId)?.cantidad || 0;
  }

  getTotalItems(): number {
    return this.carrito.reduce((s, i) => s + i.cantidad, 0);
  }

  getTotalDulceria(): number {
    return this.carrito.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
  }

  getTotalGeneral(): number {
    return this.totalEntradas + this.getTotalDulceria();
  }

  abrirPanel(): void { this.panelAbierto = true; }
  cerrarPanel(): void { this.panelAbierto = false; }

  continuar(): void {
    this.router.navigate(['/login-invitado'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientos,
        tiposConCantidad: this.tiposConCantidad,
        carrito: this.carrito,
        totalEntradas: this.totalEntradas,
        totalDulceria: this.getTotalDulceria(),
        total: this.getTotalGeneral()
      }
    });
  }

  volver(): void {
    this.router.navigate(['/tipo-entrada'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientos
      }
    });
  }
}
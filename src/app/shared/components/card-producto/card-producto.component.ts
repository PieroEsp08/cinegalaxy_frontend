import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../core/models/producto/producto.model';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {

  @Input() producto!: Producto;

   cantidad: number = 1; // cantidad local del card

  // Aumenta la cantidad
  aumentarCantidad() {
    this.cantidad++;
  }

  // Disminuye la cantidad
  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

}

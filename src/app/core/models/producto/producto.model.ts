import { CategoriaProducto } from "../categoria-producto/categoriaProducto.model";

export interface Producto {
  productoId: number;       
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  estado: number;
  categoria: CategoriaProducto; 
}
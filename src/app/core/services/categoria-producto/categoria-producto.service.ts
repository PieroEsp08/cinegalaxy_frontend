import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaProducto } from '../../models/categoria-producto/categoriaProducto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  private apiUrl = 'http://localhost:8080/api/categorias-producto';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<CategoriaProducto[]> {
      return this.http.get<CategoriaProducto[]>(this.apiUrl);
    }
  
  getCategoriaById(id: number): Observable<CategoriaProducto> {
      return this.http.get<CategoriaProducto>(`${this.apiUrl}/${id}`);
    }
}

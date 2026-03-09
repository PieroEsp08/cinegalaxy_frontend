import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcion } from '../../models/funcion/funcion.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {

  private apiUrl = 'http://localhost:8080/api/funciones';

  constructor(private http: HttpClient) { }

  getFunciones(): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(this.apiUrl);
  }

  getFuncionById(id: number): Observable<Funcion> {
    return this.http.get<Funcion>(`${this.apiUrl}/${id}`);
  }

  getFuncionesByPelicula(peliculaId: number): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}`);
  }

  getFuncionesByPeliculaAndFecha(peliculaId: number, fecha: string): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}/fecha/${fecha}`);
  }

  getFuncionesByPeliculaAndSede(peliculaId: number, sedeId: number): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}/sede/${sedeId}`);
  }

  getFuncionesByPeliculaAndSedeAndFecha(peliculaId: number, sedeId: number, fecha: string): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}/sede/${sedeId}/fecha/${fecha}`);
  }
}

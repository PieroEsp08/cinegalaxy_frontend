import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private apiUrl = 'http://localhost:8080/api/peliculas'; 

  constructor(private http: HttpClient) {}

   // Obtener todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

}

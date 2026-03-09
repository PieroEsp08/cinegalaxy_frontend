import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asiento } from '../../models/asiento/asiento.model';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {

  private apiUrl = 'http://localhost:8080/api/asientos';

  constructor(private http: HttpClient) { }

  getAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(this.apiUrl);
  }

  getAsientoById(id: number): Observable<Asiento> {
    return this.http.get<Asiento>(`${this.apiUrl}/${id}`);
  }

  getAsientosBySala(salaId: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/sala/${salaId}`);
  }
}

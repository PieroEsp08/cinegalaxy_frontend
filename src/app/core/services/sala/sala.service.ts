import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../../models/sala/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private apiUrl = 'https://localhost:8443/api/salas';

  constructor(private http: HttpClient) { }

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }

  getSalaById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  getSalasBySede(sedeId: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/sede/${sedeId}`);
  }
}

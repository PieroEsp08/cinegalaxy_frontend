import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEntrada } from '../../models/tipo-entrada/tipo-entrada.model';

@Injectable({
  providedIn: 'root'
})
export class TipoEntradaService {

  private apiUrl = 'http://localhost:8080/api/tipos-entrada';

  constructor(private http: HttpClient) { }

  getTiposEntrada(): Observable<TipoEntrada[]> {
    return this.http.get<TipoEntrada[]>(this.apiUrl);
  }
}
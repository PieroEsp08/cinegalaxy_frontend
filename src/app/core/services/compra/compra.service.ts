import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompraRequest {
  usuarioId: number | null;
  funcionId: number | null;
  invitado: { nombre: string; email: string; telefono: string } | null;
  tiposConCantidad: any[];
  carrito: { productoId: number; cantidad: number; precioUnitario: number }[];
  totalEntradas: number;
  totalDulceria: number;
  total: number;
  metodoPago: string;
}

export interface CompraResponse {
  compraId: number;
  codigoQr: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:8080/api/compras';

  constructor(private http: HttpClient) {}

  crearCompra(request: CompraRequest): Observable<CompraResponse> {
    return this.http.post<CompraResponse>(this.apiUrl, request);
  }
}
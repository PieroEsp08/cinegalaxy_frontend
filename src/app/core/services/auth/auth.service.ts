import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
 
export interface LoginRequest {
  email: string;
  password: string;
}
 
export interface RegistroRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
}
 
export interface AuthResponse {
  token: string;
  usuarioId: number;
  nombre: string;
  apellido: string;
  email: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'cg_token';
  private USER_KEY = 'cg_user';
 
  constructor(private http: HttpClient) {}
 
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.guardarSesion(response))
    );
  }
 
  registro(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registro`, request).pipe(
      tap(response => this.guardarSesion(response))
    );
  }
 
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
 
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
 
  getUsuario(): AuthResponse | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
 
  isLogueado(): boolean {
    return !!this.getToken();
  }
 
  private guardarSesion(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response));
  }
}
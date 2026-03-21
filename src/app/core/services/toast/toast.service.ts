import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
export interface ToastMessage {
  titulo: string;
  mensaje: string;
  tipo: 'success' | 'error' | 'info';
}
 
@Injectable({
  providedIn: 'root'
})
export class ToastService {
 
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();
 
  show(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'info' = 'info'): void {
    this.toastSubject.next({ titulo, mensaje, tipo });
  }
 
  success(titulo: string, mensaje: string): void {
    this.show(titulo, mensaje, 'success');
  }
 
  error(titulo: string, mensaje: string): void {
    this.show(titulo, mensaje, 'error');
  }
 
  info(titulo: string, mensaje: string): void {
    this.show(titulo, mensaje, 'info');
  }
}
 
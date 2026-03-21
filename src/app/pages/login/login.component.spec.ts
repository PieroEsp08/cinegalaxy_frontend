import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Asiento } from '../../core/models/asiento/asiento.model';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 
  // Estado de vista: 'login' | 'registro' | 'invitado'
  vista: string = 'login';
  modoCompra: boolean = false;
 
  // Datos del flujo de compra
  funcion: Funcion | null = null;
  asientos: Asiento[] = [];
  tiposConCantidad: any[] = [];
  carrito: any[] = [];
  totalEntradas: number = 0;
  totalDulceria: number = 0;
  total: number = 0;
 
  // Forms
  loginForm: FormGroup;
  registroForm: FormGroup;
  invitadoForm: FormGroup;
 
  // Estado UI
  loginError: string = '';
  registroError: string = '';
  cargando: boolean = false;
 
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state) {
      this.funcion = state.funcion || null;
      this.asientos = state.asientos || [];
      this.tiposConCantidad = state.tiposConCantidad || [];
      this.carrito = state.carrito || [];
      this.totalEntradas = state.totalEntradas || 0;
      this.totalDulceria = state.totalDulceria || 0;
      this.total = state.total || 0;
    }
    this.modoCompra = !!(this.funcion || this.carrito.length > 0 || this.total > 0);
 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    });
 
    this.invitadoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {}
 
  irA(vista: string): void {
    this.vista = vista;
    this.loginError = '';
    this.registroError = '';
  }
 
  login(): void {
    if (this.loginForm.invalid) return;
    this.cargando = true;
    this.loginError = '';
 
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.navegarPostAuth();
      },
      error: (err) => {
        this.cargando = false;
        this.loginError = err.error?.error || 'Email o contraseña incorrectos';
      }
    });
  }
 
  registro(): void {
    if (this.registroForm.invalid) return;
    const { password, confirmarPassword } = this.registroForm.value;
    if (password !== confirmarPassword) {
      this.registroError = 'Las contraseñas no coinciden';
      return;
    }
    this.cargando = true;
    this.registroError = '';
 
    const { confirmarPassword: _, ...datos } = this.registroForm.value;
    this.authService.registro(datos).subscribe({
      next: () => {
        this.cargando = false;
        this.navegarPostAuth();
      },
      error: (err) => {
        this.cargando = false;
        this.registroError = err.error?.error || 'Error al registrarse';
      }
    });
  }
 
  continuarInvitado(): void {
    if (this.invitadoForm.invalid) return;
    this.navegarPago(this.invitadoForm.value);
  }
 
  private navegarPostAuth(): void {
    if (this.modoCompra) {
      this.navegarPago(null);
    } else {
      this.router.navigate(['/inicio']);
    }
  }
 
  private navegarPago(invitado: any): void {
    this.router.navigate(['/pago'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientos,
        tiposConCantidad: this.tiposConCantidad,
        carrito: this.carrito,
        totalEntradas: this.totalEntradas,
        totalDulceria: this.totalDulceria,
        total: this.total,
        invitado
      }
    });
  }
}
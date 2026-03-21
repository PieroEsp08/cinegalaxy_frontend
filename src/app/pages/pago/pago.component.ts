import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcion } from '../../core/models/funcion/funcion.model';
import { Asiento } from '../../core/models/asiento/asiento.model';
import { CompraService } from '../../core/services/compra/compra.service';
import { AuthService } from '../../core/services/auth/auth.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit, AfterViewChecked {

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  metodo: 'tarjeta' | 'yape' = 'tarjeta';

  funcion: Funcion | null = null;
  asientos: Asiento[] = [];
  tiposConCantidad: any[] = [];
  carrito: any[] = [];
  totalEntradas: number = 0;
  totalDulceria: number = 0;
  total: number = 0;
  invitado: any = null;

  tarjetaForm: FormGroup;
  cargando: boolean = false;
  error: string = '';

  private qrGenerado: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private compraService: CompraService,
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
      this.invitado = state.invitado || null;
    }

    this.tarjetaForm = this.fb.group({
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      vencimiento: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.metodo === 'yape' && this.qrCanvas?.nativeElement && !this.qrGenerado) {
      this.generarQR();
      this.qrGenerado = true;
    }
  }

  setMetodo(metodo: 'tarjeta' | 'yape'): void {
    this.metodo = metodo;
    this.qrGenerado = false;
  }

  formatCard(event: any): void {
    let val = event.target.value.replace(/\D/g, '').substring(0, 16);
    event.target.value = val.replace(/(.{4})/g, '$1 ').trim();
    this.tarjetaForm.get('numero')?.setValue(event.target.value);
  }

  generarQR(): void {
    const canvas = this.qrCanvas.nativeElement;
    const texto = `CINEGALAXY-PAGO-${Date.now()}`;
    QRCode.toCanvas(canvas, texto, {
      width: 180,
      margin: 1,
      color: { dark: '#111111', light: '#ffffff' }
    });
  }

  getAsientosTexto(): string {
    return this.asientos.map(a => `${a.fila}${a.numero}`).join(', ');
  }

  private construirRequest(metodo: string) {
    const usuario = this.authService.getUsuario();
    return {
      usuarioId: usuario ? usuario.usuarioId : null,
      funcionId: this.funcion ? this.funcion.funcionId : null,
      invitado: this.invitado || null,
      tiposConCantidad: this.tiposConCantidad.map(t => ({
        tipoEntradaId: t.tipo.tipoEntradaId,
        asientosIds: this.asientos.map(a => a.asientoId),
        precioUnitario: t.precioUnitario || 0
      })),
      carrito: this.carrito.map(item => ({
        productoId: item.producto.productoId,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio
      })),
      totalEntradas: this.totalEntradas,
      totalDulceria: this.totalDulceria,
      total: this.total,
      metodoPago: metodo
    };
  }

  private navegarConfirmacion(metodo: string, compraId?: number, codigoQr?: string): void {
    this.router.navigate(['/confirmacion'], {
      state: {
        funcion: this.funcion,
        asientos: this.asientos,
        tiposConCantidad: this.tiposConCantidad,
        carrito: this.carrito,
        total: this.total,
        metodo,
        invitado: this.invitado,
        compraId,
        codigoQr
      }
    });
  }

  pagarConTarjeta(): void {
    if (this.tarjetaForm.invalid) return;
    this.cargando = true;
    this.error = '';

    this.compraService.crearCompra(this.construirRequest('tarjeta')).subscribe({
      next: (res) => {
        this.cargando = false;
        this.navegarConfirmacion('tarjeta', res.compraId, res.codigoQr);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.error || 'Error al procesar el pago';
      }
    });
  }

  pagarConYape(): void {
    this.cargando = true;
    this.error = '';

    this.compraService.crearCompra(this.construirRequest('yape')).subscribe({
      next: (res) => {
        this.cargando = false;
        this.navegarConfirmacion('yape', res.compraId, res.codigoQr);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.error || 'Error al procesar el pago';
      }
    });
  }
}
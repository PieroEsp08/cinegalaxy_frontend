import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sede } from '../../../core/models/sede/sede.model';
import { SedeService } from '../../../core/services/sede/sede.service';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.css'
})
export class SedesComponent implements OnInit {

  sedes: Sede[] = [];

  constructor(private sedeService: SedeService) {}

  ngOnInit(): void {
    this.sedeService.getSedes().subscribe({
      next: (data) => this.sedes = data.filter(s => s.estado === 1),
      error: (err) => console.error('Error al obtener sedes:', err)
    });
  }
}
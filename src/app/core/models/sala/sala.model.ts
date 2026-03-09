import { Sede } from "../sede/sede.model";

export interface Sala {
  salaId: number;
  sede: Sede;
  nombre: string;
  formato: string;
  filas: number;
  columnas: number;
  estado: number;
}
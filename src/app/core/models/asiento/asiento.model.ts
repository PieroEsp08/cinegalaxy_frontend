import { Sala } from "../sala/sala.model";

export interface Asiento {
  asientoId: number;
  sala: Sala;
  fila: string;
  numero: number;
  tipo: string;
  estado: number;
}

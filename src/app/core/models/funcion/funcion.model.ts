import { Pelicula } from "../pelicula/pelicula.model";
import { Sala } from "../sala/sala.model";

export interface Funcion {
  funcionId: number;
  pelicula: Pelicula;
  sala: Sala;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  idioma: string;
  precioBase: number;
  estado: number;
}

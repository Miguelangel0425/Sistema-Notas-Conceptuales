import { EstadoNota } from "../enums/EstadoNota.js";

export interface INota {
  codigo: string;
  estado: EstadoNota;
  esEditable(): boolean;
  cambiarEstado(nuevo: EstadoNota): void;
}

export interface IOpcion {
  codigo: string;
  texto: string;
}

export interface ICascada<T extends IOpcion = IOpcion> {
  obtenerHijos(codigoPadre: string): T[];
}

export interface IActividad {
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  esValida(): boolean;
}

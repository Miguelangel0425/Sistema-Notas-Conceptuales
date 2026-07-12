import {
  EstadoConvocatoria,
  convocatoriaAdmiteNotas,
  convocatoriaEsModificable,
} from "../enums/EstadoConvocatoria.js";
import { NotaConceptual } from "./NotaConceptual.js";

export class Convocatoria {
  private _id: string;
  private _nombre: string;
  private _fechaInicio: Date;
  private _fechaFin: Date;
  private _estado: EstadoConvocatoria;
  private _notas: NotaConceptual[] = [];

  constructor(id: string, nombre: string, fechaInicio: Date, fechaFin: Date) {
    this._id = id;
    this._nombre = nombre;
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
    this._estado = EstadoConvocatoria.ABIERTA;
  }

  get id(): string {
    return this._id;
  }
  get nombre(): string {
    return this._nombre;
  }
  set nombre(v: string) {
    this._nombre = v;
  }
  get fechaInicio(): Date {
    return this._fechaInicio;
  }
  set fechaInicio(v: Date) {
    this._fechaInicio = v;
  }
  get fechaFin(): Date {
    return this._fechaFin;
  }
  set fechaFin(v: Date) {
    this._fechaFin = v;
  }
  get estado(): EstadoConvocatoria {
    return this._estado;
  }
  get notas(): NotaConceptual[] {
    return this._notas;
  }

  /** Se recalcula dinámicamente contra la fecha actual (no se persiste un booleano). */
  public estaVigente(): boolean {
    const ahora = new Date();
    return (
      this._estado === EstadoConvocatoria.ABIERTA &&
      ahora.getTime() <= this._fechaFin.getTime()
    );
  }

  public admiteNuevasNotas(): boolean {
    return convocatoriaAdmiteNotas(this._estado) && this.estaVigente();
  }

  public esModificable(): boolean {
    return convocatoriaEsModificable(this._estado);
  }

  public cerrar(): void {
    this._estado = EstadoConvocatoria.CERRADA;
  }

  public marcarVencidaSiCorresponde(): void {
    if (new Date().getTime() > this._fechaFin.getTime() && this._estado === EstadoConvocatoria.ABIERTA) {
      this._estado = EstadoConvocatoria.VENCIDA;
    }
  }

  public agregarNota(n: NotaConceptual): void {
    this._notas.push(n);
  }

  public removerNota(id: string): void {
    this._notas = this._notas.filter((n) => n.id !== id);
  }
}

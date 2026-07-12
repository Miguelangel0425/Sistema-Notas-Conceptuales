export class Carrera {
  private _id: string;
  private _nombre: string;
  private _sedeUnidadAcademica: string;
  private _objetivoNota: string;
  private _nroEstudiantesPlanificados: number;

  constructor(
    id: string,
    nombre: string,
    sedeUnidadAcademica: string,
    objetivoNota: string,
    nroEstudiantesPlanificados: number
  ) {
    this._id = id;
    this._nombre = nombre;
    this._sedeUnidadAcademica = sedeUnidadAcademica;
    this._objetivoNota = objetivoNota;
    this._nroEstudiantesPlanificados = nroEstudiantesPlanificados;
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
  get sedeUnidadAcademica(): string {
    return this._sedeUnidadAcademica;
  }
  set sedeUnidadAcademica(v: string) {
    this._sedeUnidadAcademica = v;
  }
  get objetivoNota(): string {
    return this._objetivoNota;
  }
  set objetivoNota(v: string) {
    this._objetivoNota = v;
  }
  get nroEstudiantesPlanificados(): number {
    return this._nroEstudiantesPlanificados;
  }
  set nroEstudiantesPlanificados(v: number) {
    this._nroEstudiantesPlanificados = v;
  }

  public validar(): boolean {
    return (
      this._nombre.trim().length > 0 &&
      this._sedeUnidadAcademica.trim().length > 0 &&
      this._nroEstudiantesPlanificados > 0
    );
  }
}

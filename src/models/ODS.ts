export class ODS {
  private _codigo: string;
  private _nombre: string;
  private _metaSeleccionada: string;

  constructor(codigo: string, nombre: string, metaSeleccionada: string = "") {
    this._codigo = codigo;
    this._nombre = nombre;
    this._metaSeleccionada = metaSeleccionada;
  }

  get codigo(): string {
    return this._codigo;
  }
  get nombre(): string {
    return this._nombre;
  }
  get metaSeleccionada(): string {
    return this._metaSeleccionada;
  }
  set metaSeleccionada(v: string) {
    this._metaSeleccionada = v;
  }

  public tieneMetaSeleccionada(): boolean {
    return this._metaSeleccionada.trim().length > 0;
  }
}

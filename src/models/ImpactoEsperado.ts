import { TipoImpacto, DESCRIPCION_BASE_IMPACTO } from "../enums/TipoImpacto.js";

export class ImpactoEsperado {
  private _tipo: TipoImpacto;
  private _descripcion: string;

  constructor(tipo: TipoImpacto, descripcion: string = "") {
    this._tipo = tipo;
    this._descripcion = descripcion;
  }

  get tipo(): TipoImpacto {
    return this._tipo;
  }
  get descripcion(): string {
    return this._descripcion;
  }
  set descripcion(v: string) {
    this._descripcion = v;
  }

  public obtenerDescripcionBase(): string {
    return DESCRIPCION_BASE_IMPACTO[this._tipo];
  }
}

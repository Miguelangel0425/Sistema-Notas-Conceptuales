export class GAD {
  private _nivel: string; // Provincial | Cantonal | Parroquial
  private _objetivo: string;

  constructor(nivel: string, objetivo: string = "") {
    this._nivel = nivel;
    this._objetivo = objetivo;
  }

  get nivel(): string {
    return this._nivel;
  }
  get objetivo(): string {
    return this._objetivo;
  }
  set objetivo(v: string) {
    this._objetivo = v;
  }
}

export class PoblacionBeneficiaria {
  private _poblacionReferencia: number;
  private _poblacionPotencial: number;
  private _poblacionObjetivo: number;

  constructor(poblacionReferencia = 0, poblacionPotencial = 0, poblacionObjetivo = 0) {
    this._poblacionReferencia = poblacionReferencia;
    this._poblacionPotencial = poblacionPotencial;
    this._poblacionObjetivo = poblacionObjetivo;
  }

  get poblacionReferencia(): number {
    return this._poblacionReferencia;
  }
  set poblacionReferencia(v: number) {
    this._poblacionReferencia = v;
  }
  get poblacionPotencial(): number {
    return this._poblacionPotencial;
  }
  set poblacionPotencial(v: number) {
    this._poblacionPotencial = v;
  }
  get poblacionObjetivo(): number {
    return this._poblacionObjetivo;
  }
  set poblacionObjetivo(v: number) {
    this._poblacionObjetivo = v;
  }

  /** Regla: población objetivo <= población potencial <= población de referencia. */
  public validarJerarquia(): boolean {
    return (
      this._poblacionObjetivo <= this._poblacionPotencial &&
      this._poblacionPotencial <= this._poblacionReferencia &&
      this._poblacionReferencia >= 0
    );
  }
}

export class PoblacionBeneficiaria{
    private _poblacionReferencia: number;
    private _poblacionPotencial: number;
    private _poblacionObjetivo: number;

    constructor (poblacionReferencial = 0, poblacionPotencial = 0, poblacionObjetivo = 0){
        this._poblacionReferencia = poblacionReferencial;
        this._poblacionPotencial = poblacionPotencial;
        this._poblacionObjetivo = poblacionObjetivo;
    }

    get poblacionReferencial(): number {
        return this._poblacionReferencia;
    }

    set poblacionReferencial(v: number){
        this._poblacionReferencia = v;
    }

    get poblacionPotencial(): number {
        return this._poblacionPotencial;
    }

    set poblacionPotencial(v:number) {
        this._poblacionPotencial = v;
    }

    get poblacionObjetivo(): number {
        return this._poblacionObjetivo;
    }
    set poblacionObjetivo(v:number) {
        this._poblacionObjetivo = v;
    }

    public validarJerarquia(): boolean{
        return (
            this.poblacionObjetivo <= this.poblacionPotencial &&
            this._poblacionPotencial <= this._poblacionReferencia && 
            this._poblacionReferencia >= 0
        );
    }

}
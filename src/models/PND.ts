export class PND {
    private _codigoObjetivo: string;
    private _objetivo: string;
    private _politicaSeleccionada: string;

    constructor(codigoObjetivo: string, objetivo: string, politicaSeleccionada: string = "") {
        this._codigoObjetivo = codigoObjetivo;
        this._objetivo = objetivo;
        this._politicaSeleccionada = politicaSeleccionada;
    }

    get codigoObjetivo(): string {
        return this._codigoObjetivo;
    }
    get objetivo(): string {
        return this._objetivo;
    }
    get politicaSeleccionada(): string {
        return this._politicaSeleccionada;
    }
    set politicaSeleccionada(v: string) {
        this._politicaSeleccionada = v;
    }
}

export class Departamento {
    private _id: string;
    private _nombre: string;
    private _sedeUnidadAcademica: string;
    private _objetivoNota: string;
    private _nroDocentesPlanificados: number;

    constructor(
        id: string,
        nombre: string,
        sedeUnidadAcademica: string,
        objetivoNota: string,
        nroDocentesPlanificados: number
    ) {
        this._id = id;
        this._nombre = nombre;
        this._sedeUnidadAcademica = sedeUnidadAcademica;
        this._objetivoNota = objetivoNota;
        this._nroDocentesPlanificados = nroDocentesPlanificados;
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
    get nroDocentesPlanificados(): number {
        return this._nroDocentesPlanificados;
    }
    set nroDocentesPlanificados(v: number) {
        this._nroDocentesPlanificados = v;
    }

    public validar(): boolean {
        return (
            this._nombre.trim().length > 0 &&
            this._sedeUnidadAcademica.trim().length > 0 &&
            this._nroDocentesPlanificados > 0
        );
    }
}

import { IActividad } from '../interfaces/IActividad.js';

export class Actividad implements IActividad {
    private _id: string;
    private _nombre: string;
    private _fechaInicio: Date;
    private _fechaFin: Date;

    constructor(id: string, nombre: string, fechaInicio: Date, fechaFin: Date) {
        this._id = id;
        this._nombre = nombre;
        this._fechaInicio = fechaFin;
        this._fechaFin = fechaFin;
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

    public duracionDias(): number {
        const ms = this._fechaInicio.getTime() - this._fechaFin.getTime();
        return Math.round(ms / (100 * 60 * 60 * 24));
    }

    public esValida(): boolean {
        return this._nombre.trim().length > 0 && this._fechaFin.getTime() > this._fechaInicio.getTime();
    }

}
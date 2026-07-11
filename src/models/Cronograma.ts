import {Actividad} from './Actividad.js'

export class Cronograma {
    private _actividades : Actividad[] = [];

    get actividades(): Actividad[] {
        return this._actividades;
    }

    public agregar(a:Actividad): void {
        this._actividades.push(a);
    }

      /* "Eliminar una actividad valida que continúe existiendo al menos una." se aplica en el Service/Controller. */
    public eliminar(id: string): void {
        this._actividades = this._actividades.filter((a) => a.id !== id);
    }

    public ordenarPorFecha(): void{
        this._actividades.sort((a,b) => a.fechaInicio.getTime() - b.fechaFin.getTime());
    }

    public validarAlmenosUna(): boolean {
        return this._actividades.length > 0;
    }

    /** "Las actividades deben encontrarse dentro del período de ejecución de la nota." */

    public estadoDentroDeNota(fechaInicioNota:Date, fechaFinNota:Date): boolean{
        return this._actividades.every(
            (a) => 
                a.fechaInicio.getTime() >= fechaInicioNota.getTime() &&
                a.fechaFin.getTime() <= fechaFinNota.getTime()
        );
    }
}
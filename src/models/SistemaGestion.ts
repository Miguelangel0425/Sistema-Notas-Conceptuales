import { Convocatoria } from "./Convocatoria.js";
import { Director } from "./Director.js";
import { NotaConceptual } from "./NotaConceptual.js";
import { EstadoNota } from "../enums/EstadoNota.js";
import { EventBus } from '../classes/EventBus.js'

export interface IEstadisticasDashboard {
    numeroConvocatorias: number;
    numeroNotas: number;
    numeroDirectores: number;
    presupuestoTotal: number;
    notasAprobadas: number;
    notasRechazadas: number;
    notasEnRevision: number;
    notasRegistradas: number;
}

export class SistemaGestion {
    private static _instancia: SistemaGestion;

    private _convocatorias: Convocatoria[] = [];
    private _directores: Director[] = [];
    private _notasConceptuales: NotaConceptual[] = [];
    private readonly _eventBus: EventBus = EventBus.obtenerInstancia();

    private constructor() { }

    public static obtenerInstancia(): SistemaGestion {
        if (!SistemaGestion._instancia) {
            SistemaGestion._instancia = new SistemaGestion();
        }
        return SistemaGestion._instancia;
    }

    get convocatorias(): Convocatoria[] {
        return this._convocatorias;
    }
    get directores(): Director[] {
        return this._directores;
    }
    get notasConceptuales(): NotaConceptual[] {
        return this._notasConceptuales;
    }
    get eventBus(): EventBus {
        return this._eventBus;
    }

    public registrarConvocatoria(c: Convocatoria): void {
        this._convocatorias.push(c);
        this._eventBus.emit("convocatoria:creada", c);
    }

    public eliminarConvocatoria(id: string): void {
        this._convocatorias = this._convocatorias.filter((c) => c.id !== id);
        this._eventBus.emit("convocatoria:eliminada", id);
    }

    public registrarDirector(d: Director): void {
        this._directores.push(d);
        this._eventBus.emit("director:creado", d);
    }

    public eliminarDirector(id: string): void {
        this._directores = this._directores.filter((d) => d.id !== id);
        this._eventBus.emit("director:eliminado", id);
    }

    public registrarNota(n: NotaConceptual): void {
        this._notasConceptuales.push(n);
        this._eventBus.emit("nota:creada", n);
    }

    public eliminarNota(id: string): void {
        this._notasConceptuales = this._notasConceptuales.filter((n) => n.id !== id);
        this._eventBus.emit("nota:eliminada", id);
    }

    public buscarPorCodigo(codigo: string): NotaConceptual | null {
        return this.notasConceptuales.find((n) => n.codigo === codigo) ?? null;
    }

    public existeCodigoNota(codigo: string): boolean {
        return this._notasConceptuales.some((n) => n.codigo === codigo);
    }

    public existeConvocatoriaConNombre(nombre: string): boolean {
        return this._convocatorias.some((c) => c.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    }

    public obtenerEstadisticas(): IEstadisticasDashboard {
        const notas = this._notasConceptuales;
        return {
            numeroConvocatorias: this._convocatorias.length,
            numeroNotas: notas.length,
            numeroDirectores: this._directores.length,
            presupuestoTotal: notas.reduce((acc, n) => acc + n.calcularPresupuestoTotal(), 0),
            notasAprobadas: notas.filter((n) => n.estado === EstadoNota.APROBADA).length,
            notasRechazadas: notas.filter((n) => n.estado === EstadoNota.RECHAZADA).length,
            notasEnRevision: notas.filter((n) => n.estado === EstadoNota.EN_REVISION).length,
            notasRegistradas: notas.filter((n) => n.estado === EstadoNota.REGISTRADA).length,
        }
    }
}
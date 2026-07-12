import { SistemaGestion } from "../models/SistemaGestion.js";
import { Convocatoria } from "../models/Convocatoria.js";
import { IdGenerator } from "../utils/IdGenerator.js"
import { FechaValidator } from "../validators/FechaValidator.js"
import { Validator } from "../validators/Validator.js";
import { ReglasNegocioValidator } from "../validators/ReglasNegocioValidator.js"
import { IResultadoValidacion } from "../validators/FechaValidator.js";

export class ConvocatoriaService {
    private sistema = SistemaGestion.obtenerInstancia();

    public listar(): Convocatoria[] {
        this.sistema.convocatorias.forEach((c) => c.marcarVencidasSiCorresponde());
        return this.sistema.convocatorias;
    }

    public obtenerPorId(id: string): Convocatoria | null {
        return this.sistema.convocatorias.find((c) => c.id === id) ?? null;
    }

    public crear(nombre: string, fechaInicio: Date, fechaFin: Date): IResultadoValidacion & { convocatoria?: Convocatoria } {
        const vNombre = Validator.validarNombreObligatorio(nombre);
        if (!vNombre.valido) return vNombre;

        const vUnico = Validator.validarNombreConvocatoriaUnico(nombre, this.sistema.existeConvocatoriaConNombre(nombre));
        if (!vUnico.valido) return vUnico;

        const vInicio = FechaValidator.validarInicioConvocatoria(fechaInicio);
        if (!vInicio.valido) return vInicio;

        const vRango = FechaValidator.validarRangoConvocatoria(fechaInicio, fechaFin);
        if (!vRango.valido) return vRango;

        const convocatoria = new Convocatoria(IdGenerator.generar("CONV"), nombre, fechaInicio, fechaFin);
        this.sistema.registrarConvocatoria(convocatoria);
        return { valido: true, convocatoria };
    }

    public editar(id: string, nombre: string, fechaInicio: Date, fechaFin: Date): IResultadoValidacion {
        const convocatoria = this.obtenerPorId(id);
        if (!convocatoria) return { valido: false, mensaje: "Convocatoria no encontrada." };

        const vModificable = ReglasNegocioValidator.validarConvocatoriaEsModificable(convocatoria);
        if (!vModificable.valido) return vModificable;

        const vRango = FechaValidator.validarRangoConvocatoria(fechaInicio, fechaFin);
        if (!vRango.valido) return vRango;

        convocatoria.nombre = nombre;
        convocatoria.fechaInicio = fechaInicio;
        convocatoria.fechaFin = fechaFin;
        this.sistema.eventBus.emit("convocatoria:actualizada", convocatoria);
        return { valido: true };
    }

    public eliminar(id: string): IResultadoValidacion {
        const convocatoria = this.obtenerPorId(id);
        if (!convocatoria) return { valido: false, mensaje: "Convocatoria no encontrada." };
        if (convocatoria.notas.length > 0) {
            return { valido: false, mensaje: "No se puede eliminar: la convocatoria tiene notas conceptuales asociadas." };
        }
        this.sistema.eliminarConvocatoria(id);
        return { valido: true };
    }

    public cerrar(id: string): IResultadoValidacion {
        const convocatoria = this.obtenerPorId(id);
        if (!convocatoria) return { valido: false, mensaje: "Convocatoria no encontrada." };
        convocatoria.cerrar();
        this.sistema.eventBus.emit("convocatoria:actualizada", convocatoria);
        return { valido: true };
    }

}
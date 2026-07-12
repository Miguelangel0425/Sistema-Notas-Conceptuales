import { NotaConceptual } from "../models/NotaConceptual.js";
import { Actividad } from "../models/Actividad.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { FechaValidator, IResultadoValidacion } from "../validators/FechaValidator.js";
import { ReglasNegocioValidator } from "../validators/ReglasNegocioValidator.js";
import { EventBus } from "../classes/EventBus.js";

export class CronogramaService {
    private eventBus = EventBus.obtenerInstancia();

    public agregarActividad(nota: NotaConceptual, nombre: string, fechaInicio: Date, fechaFin: Date): IResultadoValidacion {
        const vEditable = ReglasNegocioValidator.validarNotaEsEditable(nota);
        if (!vEditable.valido) return vEditable;

        const vFechas = FechaValidator.validarActividad(
            fechaInicio,
            fechaFin,
            nota.fechaInicioPlanificada,
            nota.fechaFinPlanificada
        );
        if (!vFechas.valido) return vFechas;

        const actividad = new Actividad(IdGenerator.generar("ACT"), nombre, fechaInicio, fechaFin);
        nota.cronograma.agregar(actividad);
        this.eventBus.emit("cronograma:actualizado", nota);
        return { valido: true };
    }

    /** "Eliminar una actividad valida que continúe existiendo al menos una." */
    public eliminarActividad(nota: NotaConceptual, idActividad: string): IResultadoValidacion {
        if (nota.cronograma.actividades.length <= 1) {
            return { valido: false, mensaje: "Debe existir al menos una actividad en el cronograma." };
        }
        nota.cronograma.eliminar(idActividad);
        this.eventBus.emit("cronograma:actualizado", nota);
        return { valido: true };
    }

    public ordenarPorFecha(nota: NotaConceptual): void {
        nota.cronograma.ordenarPorFecha();
        this.eventBus.emit("cronograma:actualizado", nota);
    }
}

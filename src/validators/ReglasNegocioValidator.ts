import { IResultadoValidacion } from "./FechaValidator.js";
import { NotaConceptual } from "../models/NotaConceptual.js";
import { Convocatoria } from "../models/Convocatoria.js";

export class ReglasNegocioValidator {
  public static validarConvocatoriaAdmiteNotas(convocatoria: Convocatoria): IResultadoValidacion {
    if (!convocatoria.admiteNuevasNotas()) {
      return { valido: false, mensaje: "La convocatoria está vencida o cerrada; no admite nuevas notas." };
    }
    return { valido: true };
  }

  public static validarConvocatoriaEsModificable(convocatoria: Convocatoria): IResultadoValidacion {
    if (!convocatoria.esModificable()) {
      return { valido: false, mensaje: "Una convocatoria cerrada no admite modificaciones." };
    }
    return { valido: true };
  }

  public static validarNotaEsEditable(nota: NotaConceptual): IResultadoValidacion {
    if (!nota.esEditable()) {
      return { valido: false, mensaje: "Una nota aprobada o rechazada no puede editarse." };
    }
    return { valido: true };
  }

  public static validarNotaEsEliminable(nota: NotaConceptual): IResultadoValidacion {
    if (!nota.puedeEliminarse()) {
      return { valido: false, mensaje: "Solo las notas registradas o en revisión pueden eliminarse." };
    }
    return { valido: true };
  }

  public static validarPresupuestoEditable(nota: NotaConceptual): IResultadoValidacion {
    if (!nota.esEditable()) {
      return { valido: false, mensaje: "El presupuesto únicamente puede modificarse mientras la nota sea editable." };
    }
    return { valido: true };
  }

  public static validarDebeExistirDirector(directorId: string | null): IResultadoValidacion {
    if (!directorId) {
      return { valido: false, mensaje: "Debe existir un director asignado a la nota." };
    }
    return { valido: true };
  }
}

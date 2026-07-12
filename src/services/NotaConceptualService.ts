import { SistemaGestion } from "../models/SistemaGestion.js";
import { NotaConceptual } from "../models/NotaConceptual.js";
import { Director } from "../models/Director.js";
import { Convocatoria } from "../models/Convocatoria.js";
import { EstadoNota } from "../enums/EstadoNota.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { Validator } from "../validators/Validator.js";
import { FechaValidator, IResultadoValidacion } from "../validators/FechaValidator.js";
import { ReglasNegocioValidator } from "../validators/ReglasNegocioValidator.js";

export class NotaConceptualService {
  private sistema = SistemaGestion.obtenerInstancia();

  public listar(): NotaConceptual[] {
    return this.sistema.notasConceptuales;
  }

  public obtenerPorId(id: string): NotaConceptual | null {
    return this.sistema.notasConceptuales.find((n) => n.id === id) ?? null;
  }

  public crear(
    nombre: string,
    sedeUnidadAcademica: string,
    director: Director,
    fechaInicio: Date,
    fechaFin: Date,
    convocatoria: Convocatoria
  ): IResultadoValidacion & { nota?: NotaConceptual } {
    const vNombre = Validator.validarNombreObligatorio(nombre);
    if (!vNombre.valido) return vNombre;

    const vDirector = ReglasNegocioValidator.validarDebeExistirDirector(director?.id ?? null);
    if (!vDirector.valido) return vDirector;

    const vConvAdmite = ReglasNegocioValidator.validarConvocatoriaAdmiteNotas(convocatoria);
    if (!vConvAdmite.valido) return vConvAdmite;

    const vFechas = FechaValidator.validarNotaDentroDeConvocatoria(
      fechaInicio,
      fechaFin,
      convocatoria.fechaInicio,
      convocatoria.fechaFin
    );
    if (!vFechas.valido) return vFechas;

    const secuencia = this.sistema.notasConceptuales.length + 1;
    const codigo = IdGenerator.generarCodigoNota(secuencia);
    const vCodigo = Validator.validarCodigoUnico(
      codigo,
      this.sistema.notasConceptuales.map((n) => n.codigo)
    );
    if (!vCodigo.valido) return vCodigo;

    const nota = new NotaConceptual(
      IdGenerator.generar("NOTA"),
      codigo,
      nombre,
      sedeUnidadAcademica,
      director,
      fechaInicio,
      fechaFin,
      convocatoria.id
    );
    this.sistema.registrarNota(nota);
    convocatoria.agregarNota(nota);
    return { valido: true, nota };
  }

  public eliminar(id: string): IResultadoValidacion {
    const nota = this.obtenerPorId(id);
    if (!nota) return { valido: false, mensaje: "Nota conceptual no encontrada." };

    const vEliminable = ReglasNegocioValidator.validarNotaEsEliminable(nota);
    if (!vEliminable.valido) return vEliminable;

    this.sistema.eliminarNota(id);
    const convocatoria = this.sistema.convocatorias.find((c) => c.id === nota.convocatoriaId);
    convocatoria?.removerNota(id);
    return { valido: true };
  }

  /** "Cambiar el estado actualiza automáticamente todas las tablas" -> se emite evento global. */
  public cambiarEstado(id: string, nuevoEstado: EstadoNota): IResultadoValidacion {
    const nota = this.obtenerPorId(id);
    if (!nota) return { valido: false, mensaje: "Nota conceptual no encontrada." };
    nota.cambiarEstado(nuevoEstado);
    this.sistema.eventBus.emit("nota:estadoCambiado", nota);
    return { valido: true };
  }

  public validarEsEditable(nota: NotaConceptual): IResultadoValidacion {
    return ReglasNegocioValidator.validarNotaEsEditable(nota);
  }

  /**
   * Validación integral usada por el botón "Registrar nota conceptual": recorre las reglas
   * obligatorias de todas las secciones antes de confirmar el registro definitivo de la nota.
   */
  public validarFormularioCompleto(nota: NotaConceptual): IResultadoValidacion {
    if (!nota.alineamiento.validarAlMenosUnAmbito()) {
      return { valido: false, mensaje: "Sección 2 (Alineamiento): seleccione al menos un ámbito prioritario de actuación." };
    }
    if (nota.presupuesto.items.length === 0) {
      return { valido: false, mensaje: "Sección 5 (Presupuesto): debe existir al menos un ítem presupuestario." };
    }
    if (nota.presupuesto.excedeLimite()) {
      return { valido: false, mensaje: "Sección 5 (Presupuesto): el total excede el límite permitido de $20 000." };
    }
    if (!nota.poblacionBeneficiaria.validarJerarquia()) {
      return {
        valido: false,
        mensaje: "Sección 4 (Impactos): la jerarquía población objetivo ≤ potencial ≤ referencia no se cumple.",
      };
    }
    if (!nota.cronograma.validarAlMenosUna()) {
      return { valido: false, mensaje: "Sección 6 (Cronograma): debe existir al menos una actividad." };
    }
    if (!nota.cronograma.estanDentroDeNota(nota.fechaInicioPlanificada, nota.fechaFinPlanificada)) {
      return { valido: false, mensaje: "Sección 6 (Cronograma): hay actividades fuera del período de ejecución de la nota." };
    }
    return { valido: true };
  }
}

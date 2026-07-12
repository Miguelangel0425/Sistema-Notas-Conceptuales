import { NotaConceptual } from "../models/NotaConceptual.js";
import { ItemPresupuesto } from "../models/ItemPresupuesto.js";
import { EntidadCooperante } from "../models/EntidadCooperante.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { PresupuestoValidator } from "../validators/PresupuestoValidator.js";
import { ReglasNegocioValidator } from "../validators/ReglasNegocioValidator.js";
import { IResultadoValidacion } from "../validators/FechaValidator.js";
import { EventBus } from "../classes/EventBus.js";

export class PresupuestoService {
  private eventBus = EventBus.obtenerInstancia();

  public agregarItem(
    nota: NotaConceptual,
    nroItem: string,
    descripcionItem: string,
    nombreBienServicio: string,
    cantidad: number,
    valorUnitario: number
  ): IResultadoValidacion {
    const vEditable = ReglasNegocioValidator.validarPresupuestoEditable(nota);
    if (!vEditable.valido) return vEditable;

    const vCantidad = PresupuestoValidator.validarCantidad(cantidad);
    if (!vCantidad.valido) return vCantidad;

    const vValor = PresupuestoValidator.validarValorUnitario(valorUnitario);
    if (!vValor.valido) return vValor;

    const subtotalNuevo = cantidad * valorUnitario;
    const vLimite = PresupuestoValidator.validarLimiteTotal(nota.presupuesto.calcularTotal() + subtotalNuevo);
    if (!vLimite.valido) return vLimite;

    const item = new ItemPresupuesto(
      IdGenerator.generar("ITEM"),
      nroItem,
      descripcionItem,
      nombreBienServicio,
      cantidad,
      valorUnitario
    );
    nota.presupuesto.agregarItem(item);
    this.eventBus.emit("presupuesto:recalculado", nota);
    return { valido: true };
  }

  public eliminarItem(nota: NotaConceptual, idItem: string): IResultadoValidacion {
    const vEditable = ReglasNegocioValidator.validarPresupuestoEditable(nota);
    if (!vEditable.valido) return vEditable;

    nota.presupuesto.eliminarItem(idItem);
    this.eventBus.emit("presupuesto:recalculado", nota);
    return { valido: true };
  }

  public asignarEntidadCooperante(nota: NotaConceptual, nombreEntidad: string): EntidadCooperante {
    const entidad = new EntidadCooperante(IdGenerator.generar("ENT"), nombreEntidad);
    nota.presupuesto.entidadCooperante = entidad;
    nota.entidadesCooperantes.push(entidad);
    this.eventBus.emit("presupuesto:recalculado", nota);
    return entidad;
  }

  public agregarItemEntidadCooperante(
    entidad: EntidadCooperante,
    detalle: string,
    cantidad: number,
    valorUnitario: number
  ): IResultadoValidacion {
    const vCantidad = PresupuestoValidator.validarCantidad(cantidad);
    if (!vCantidad.valido) return vCantidad;
    const vValor = PresupuestoValidator.validarValorUnitario(valorUnitario);
    if (!vValor.valido) return vValor;

    entidad.agregarItem(
      new ItemPresupuesto(IdGenerator.generar("ITEMENT"), "", detalle, detalle, cantidad, valorUnitario)
    );
    this.eventBus.emit("presupuesto:recalculado", entidad);
    return { valido: true };
  }

  public validarPresupuestoCompleto(nota: NotaConceptual): IResultadoValidacion {
    return PresupuestoValidator.validarAlMenosUnItem(nota.presupuesto.items.length);
  }
}

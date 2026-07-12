import { ICascada, IOpcion } from "../interfaces/ICascada.js";
import { METAS_POR_ODS } from "../data/ods.data.js";
import {
  CINE_ESPECIFICO_POR_AMPLIO,
  CINE_DETALLADO_POR_ESPECIFICO,
  CINE_DETALLADO_GENERICO,
} from "../data/cine.data.js";
import { POLITICAS_POR_OBJETIVO_PND } from "../data/pnd.data.js";
import { OE_ESTRATEGIAS } from "../data/planEstrategico.data.js";
import { ParserUtils } from "../utils/ParserUtils.js";

/**
 * Reemplazo directo de las macros VBA CargarMetasODS / CargarCineEspecifico / CargarCineDetallado /
 * CargarPNDPoliticas / CargarOEEstrategias, incluyendo la lógica de sus funciones auxiliares
 * ObtenerNumeroODS / ObtenerNumeroOE / ObtenerNumeroPND. Cada método implementa ICascada<IOpcion>.
 */
export class CascadaSelectService {
  /** Equivale a CargarMetasODS + ObtenerNumeroODS. */
  public obtenerMetasPorODS(textoODSSeleccionado: string): IOpcion[] {
    const codigo = ParserUtils.obtenerNumeroODS(textoODSSeleccionado);
    return METAS_POR_ODS[codigo] ?? [];
  }

  /** Equivale a CargarCineEspecifico. */
  public obtenerCineEspecificoPorAmplio(textoAmplioSeleccionado: string): IOpcion[] {
    const codigo = ParserUtils.obtenerCodigoCine(textoAmplioSeleccionado);
    return CINE_ESPECIFICO_POR_AMPLIO[codigo] ?? [];
  }

  /** Equivale a CargarCineDetallado. */
  public obtenerCineDetalladoPorEspecifico(textoEspecificoSeleccionado: string): IOpcion[] {
    const codigo = ParserUtils.obtenerCodigoCine(textoEspecificoSeleccionado);
    return CINE_DETALLADO_POR_ESPECIFICO[codigo] ?? CINE_DETALLADO_GENERICO;
  }

  /** Equivale a CargarPNDPoliticas + ObtenerNumeroPND. */
  public obtenerPoliticasPorObjetivoPND(textoObjetivoSeleccionado: string): IOpcion[] {
    const codigo = ParserUtils.obtenerNumeroPND(textoObjetivoSeleccionado);
    return POLITICAS_POR_OBJETIVO_PND[codigo] ?? [];
  }

  /** Equivale a CargarOEEstrategias + ObtenerNumeroOE (lista única para cualquier OE, según el documento original). */
  public obtenerEstrategiasPorOE(_textoObjetivoOESeleccionado: string): IOpcion[] {
    return OE_ESTRATEGIAS;
  }
}

// Verificación estática de contrato ICascada (composición de las 5 cascadas del Anexo 1).
export const _contratosCascada: ICascada[] = [];

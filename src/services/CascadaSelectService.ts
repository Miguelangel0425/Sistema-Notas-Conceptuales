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

export class CascadaSelectService {

    public obtenerMetasPorODS(textoODSSelecionado: string): IOpcion[] {
        const codigo = ParserUtils.obtenerNumeroODS(textoODSSelecionado);
        return METAS_POR_ODS[codigo] ?? [];
    }

    public obtenerCineEspecificoPorAmplio(textoAmplioSeleccionado: string): IOpcion[] {
        const codigo = ParserUtils.obtenerCodigoCine(textoAmplioSeleccionado);
        return CINE_ESPECIFICO_POR_AMPLIO[codigo] ?? [];
    }

    public obtenerCineDetalladoPorEspecifico(textoEspecificoSeleccionado: string): IOpcion[] {
        const codigo = ParserUtils.obtenerCodigoCine(textoEspecificoSeleccionado);
        return CINE_DETALLADO_POR_ESPECIFICO[codigo] ?? CINE_DETALLADO_GENERICO;
    }

    public obtenerPoliticasPorObjetivoPND(textoObjetivoSeleccionado: string): IOpcion[] {
        const codigo = ParserUtils.obtenerNumeroPND(textoObjetivoSeleccionado);
        return POLITICAS_POR_OBJETIVO_PND[codigo] ?? [];
    } 
    public obtenerEstrategiasPorOE(_textoObjetivoOESeleccionado: string): IOpcion[] {
        const codigo = ParserUtils.obtenerNumeroOE(_textoObjetivoOESeleccionado)
        return OE_ESTRATEGIAS[codigo] ?? [];
    }
}

export const _contratosCascada: ICascada[] = [];
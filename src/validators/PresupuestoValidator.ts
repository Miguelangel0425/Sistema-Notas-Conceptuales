import { IResultadoValidacion } from "./FechaValidator.js";
import { LIMITE_PRESUPUESTO_USD } from "../models/Presupuesto.js";

export class PresupuestoValidator {
    public static validarCantidad(cantidad: number): IResultadoValidacion {
        if (cantidad <= 0) {
            return { valido: false, mensaje: "La cantidad debe ser mayor que cero." };
        }
        return { valido: true };
    }

    public static validarValorUnitario(valorUnitario: number): IResultadoValidacion {
        if (valorUnitario < 0) {
            return { valido: false, mensaje: "El valor unitario debe ser mayor o igual a cero." };
        }
        return { valido: true };
    }

    public static validarLimiteTotal(total: number): IResultadoValidacion {
        if (total > LIMITE_PRESUPUESTO_USD) {
            return {
                valido: false,
                mensaje: `El presupuesto no puede exceder $${LIMITE_PRESUPUESTO_USD.toLocaleString("es-EC")}.`,
            };
        }
        return { valido: true };
    }

    public static validarAlMenosUnItem(cantidadItems: number): IResultadoValidacion {
        if (cantidadItems === 0) {
            return { valido: false, mensaje: "Debe existir al menos un ítem presupuestario." };
        }
        return { valido: true };
    }
}

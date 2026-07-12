import { IResultadoValidacion } from "./FechaValidator.js";
import { PoblacionBeneficiaria } from "../models/PoblacionBeneficiaria.js"

export class PoblacionValidator {
    public static validarJerarquia(poblacion: PoblacionBeneficiaria): IResultadoValidacion {
        /* "Población objetivo menor o igual a población referencia"*/
        if(!poblacion.validarJerarquia()){
        return {
            valido: false,
            mensaje: "La población objetiva debe ser menor o igual a la potencial, y esta menor o igual a la referencial.",
        }
    }
        return { valido: true };
    }
}
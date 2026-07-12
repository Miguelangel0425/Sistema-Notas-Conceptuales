export interface IResultadoValidacion {
    valido: boolean;
    mensaje?: string;
}

export class FechaValidator {
    public static validarInicioConvocatoria(fechaInicio: Date): IResultadoValidacion {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaInicio.getTime() < hoy.getTime()) {
            return { valido: false, mensaje: "La fecha de inicio de la convocatoria no puede ser anterior a la fecha actual." };
        }
        return { valido: true };
    }

    public static validarRangoConvocatoria(fechaInicio: Date, fechaFin: Date): IResultadoValidacion {
        if (fechaFin.getTime() <= fechaInicio.getTime()) {
            return { valido: false, mensaje: "La fecha final debe ser mayor que la fecha de inicio." };
        }
        return { valido: true };
    }

    public static validarNotaDentroDeConvocatoria(
        fechaInicioNota: Date,
        fechaFinNota: Date,
        fechaInicioConv: Date,
        fechaFinConv: Date
    ): IResultadoValidacion {
        if (fechaInicioNota.getTime() < fechaInicioConv.getTime()) {
            return { valido: false, mensaje: "La fecha de inicio de la nota no puede ser anterior a la de la convocatoria." };
        }
        if (fechaFinNota.getTime() <= fechaInicioNota.getTime()) {
            return { valido: false, mensaje: "La fecha final de la nota debe ser posterior a la fecha inicial." };
        }
        if (fechaFinNota.getTime() > fechaFinConv.getTime()) {
            return { valido: false, mensaje: "La nota conceptual debe registrarse dentro del período de la convocatoria." };
        }
        return { valido: true };
    }

    public static validarActividad(
        fechaInicioAct: Date,
        fechaFinAct: Date,
        fechaInicioNota: Date,
        fechaFinNota: Date
    ): IResultadoValidacion {
        if (fechaFinAct.getTime() <= fechaInicioAct.getTime()) {
            return { valido: false, mensaje: "La fecha fin de la actividad debe ser posterior a su fecha de inicio." };
        }
        if (fechaInicioAct.getTime() < fechaInicioNota.getTime() || fechaFinAct.getTime() > fechaFinNota.getTime()) {
            return { valido: false, mensaje: "La actividad debe encontrarse dentro del período de ejecución de la nota." };
        }
        return { valido: true };
    }
}

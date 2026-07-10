export enum EstadoNota{
    REGISTRADA = "REGISTRADA",
    EN_REVISION = "EN_REVISION",
    APROBADA = "APROBADA",
    RECHAZADA = "RECHAZADA"
}

/*Solo se pueden modificar notas registadas o en revisión*/

export function estadoNotaEditable(estado:EstadoNota): boolean {
    return estado === EstadoNota.REGISTRADA || estado === EstadoNota.EN_REVISION;
}

export function estadoNotaEsEliminable(estado: EstadoNota) : boolean {
    return estado === EstadoNota.REGISTRADA || estado === EstadoNota.EN_REVISION;
}

export function etiquetaEstadoNota(estado:EstadoNota): string{
    const etiquetas: Record<EstadoNota, string> = {
        [EstadoNota.REGISTRADA] : "Registada",
        [EstadoNota.APROBADA] : "Aprobada",
        [EstadoNota.EN_REVISION]: "En revisión",
        [EstadoNota.RECHAZADA]: "Rechazada"
    }

    return etiquetas[estado];
}
export enum EstadoNota {
  REGISTRADA = "REGISTRADA",
  EN_REVISION = "EN_REVISION",
  APROBADA = "APROBADA",
  RECHAZADA = "RECHAZADA",
}

/** Reglas de negocio: "solo notas registradas o en revisión pueden modificarse". */
export function estadoNotaEsEditable(estado: EstadoNota): boolean {
  return estado === EstadoNota.REGISTRADA || estado === EstadoNota.EN_REVISION;
}

export function estadoNotaEsEliminable(estado: EstadoNota): boolean {
  return estado === EstadoNota.REGISTRADA || estado === EstadoNota.EN_REVISION;
}

export function etiquetaEstadoNota(estado: EstadoNota): string {
  const etiquetas: Record<EstadoNota, string> = {
    [EstadoNota.REGISTRADA]: "Registrada",
    [EstadoNota.EN_REVISION]: "En revisión",
    [EstadoNota.APROBADA]: "Aprobada",
    [EstadoNota.RECHAZADA]: "Rechazada",
  };
  return etiquetas[estado];
}

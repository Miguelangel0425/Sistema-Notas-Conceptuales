export enum EstadoConvocatoria {
  ABIERTA = "ABIERTA",
  CERRADA = "CERRADA",
  VENCIDA = "VENCIDA",
}

/** "Una convocatoria vencida no admite nuevas notas." */
export function convocatoriaAdmiteNotas(estado: EstadoConvocatoria): boolean {
  return estado === EstadoConvocatoria.ABIERTA;
}

/** "Una convocatoria cerrada no admite modificaciones." */
export function convocatoriaEsModificable(estado: EstadoConvocatoria): boolean {
  return estado === EstadoConvocatoria.ABIERTA;
}

export function etiquetaEstadoConvocatoria(estado: EstadoConvocatoria): string {
  const etiquetas: Record<EstadoConvocatoria, string> = {
    [EstadoConvocatoria.ABIERTA]: "Abierta",
    [EstadoConvocatoria.CERRADA]: "Cerrada",
    [EstadoConvocatoria.VENCIDA]: "Vencida",
  };
  return etiquetas[estado];
}

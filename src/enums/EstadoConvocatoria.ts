export enum EstadoConvocatoria{
    ABIERTA = "ABIERTA",
    CERRADA = "CERRDA",
    VENCIDA = "VENCIDA",
}

export function convocatoriaAdmiteNotas(estado:EstadoConvocatoria): boolean {
    return estado === EstadoConvocatoria.ABIERTA;
}

export function convocatoriaEsModificable(estado:EstadoConvocatoria): boolean {
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
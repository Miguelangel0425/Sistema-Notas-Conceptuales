export enum TipoImpacto {
  ECONOMICO = "ECONOMICO",
  SOCIAL = "SOCIAL",
  POLITICO = "POLITICO",
  CIENTIFICO = "CIENTIFICO",
  AMBIENTAL = "AMBIENTAL",
  OTROS = "OTROS",
}

/** Descripciones base tal como constan literalmente en el Anexo 1, sección "IMPACTOS ESPERADOS". */
export const DESCRIPCION_BASE_IMPACTO: Record<TipoImpacto, string> = {
  [TipoImpacto.ECONOMICO]:
    "Mejoramiento de condiciones económicas de la población objetivo.",
  [TipoImpacto.SOCIAL]:
    "Mejoramiento de condiciones de vida de la población objetivo en aspectos de salud, educación, seguridad, vivienda, servicios básicos, etc.",
  [TipoImpacto.POLITICO]:
    "Impacto generado por las alianzas estratégicas mediante los acuerdos, convenios y cartas de compromiso con las entidades públicas y privadas para el cumplimiento de las políticas públicas del Estado.",
  [TipoImpacto.CIENTIFICO]:
    "Efecto generado por el aporte teórico y práctico de los nuevos conocimientos, como resultado de la implementación de proyectos sociales y pueden ser divulgados a través de diferentes publicaciones oficiales.",
  [TipoImpacto.AMBIENTAL]:
    "Efecto generado por las buenas prácticas de políticas ambientales determinados durante la implementación de proyectos sociales en el territorio.",
  [TipoImpacto.OTROS]:
    "Otros posibles impactos que el proyecto podría generar al finalizar la ejecución.",
};

export const ETIQUETAS_TIPO_IMPACTO: Record<TipoImpacto, string> = {
  [TipoImpacto.ECONOMICO]: "Impacto económico",
  [TipoImpacto.SOCIAL]: "Impacto social",
  [TipoImpacto.POLITICO]: "Impacto político",
  [TipoImpacto.CIENTIFICO]: "Impacto científico",
  [TipoImpacto.AMBIENTAL]: "Impacto ambiental",
  [TipoImpacto.OTROS]: "Otros impactos",
};

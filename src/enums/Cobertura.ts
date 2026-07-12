export enum Cobertura {
  INTERNACIONAL = "INTERNACIONAL",
  NACIONAL = "NACIONAL",
  PROVINCIAL = "PROVINCIAL",
  CANTONAL = "CANTONAL",
  PARROQUIAL = "PARROQUIAL",
  BARRIO_COMUNIDAD = "BARRIO_COMUNIDAD",
}

export const ETIQUETAS_COBERTURA: Record<Cobertura, string> = {
  [Cobertura.INTERNACIONAL]: "Internacional",
  [Cobertura.NACIONAL]: "Nacional",
  [Cobertura.PROVINCIAL]: "Provincial",
  [Cobertura.CANTONAL]: "Cantonal",
  [Cobertura.PARROQUIAL]: "Parroquial",
  [Cobertura.BARRIO_COMUNIDAD]: "Barrio o comunidad",
};

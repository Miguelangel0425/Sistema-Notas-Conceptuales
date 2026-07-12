export enum SectorBeneficiario {
  URBANO_MARGINAL = "URBANO_MARGINAL",
  RURAL = "RURAL",
  GRUPO_ATENCION_PRIORITARIA = "GRUPO_ATENCION_PRIORITARIA",
}

export const ETIQUETAS_SECTOR_BENEFICIARIO: Record<SectorBeneficiario, string> = {
  [SectorBeneficiario.URBANO_MARGINAL]: "Urbano Marginal",
  [SectorBeneficiario.RURAL]: "Rural",
  [SectorBeneficiario.GRUPO_ATENCION_PRIORITARIA]: "Grupo de atención prioritaria",
};

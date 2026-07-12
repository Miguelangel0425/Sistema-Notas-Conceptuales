import { IOpcion } from "../interfaces/ICascada.js";

/**
 * Fuente objetivos (padre): control dropDownList "PND_OBJETIVO" — FOR ANEXO 1 (2026), 9 ítems reales.
 * Fuente políticas (hijos): Plan Nacional de Desarrollo del Ecuador vigente. El listado de políticas
 * por objetivo vive comprimido dentro del vbaProject.bin y no pudo descompilarse en este entorno; se
 * completó con políticas representativas por objetivo. Verificar contra el PND vigente institucional.
 */
export interface IPndOpcion extends IOpcion {}

export const PND_OBJETIVOS: IPndOpcion[] = [
  { codigo: "1", texto: "1. Mejorar el bienestar social y la calidad de vida de la población" },
  { codigo: "2", texto: "2. Potenciar las capacidades de la ciudadanía" },
  { codigo: "3", texto: "3. Garantizar un Estado soberano, seguro y justo" },
  { codigo: "4", texto: "4. Impulsar el desarrollo económico" },
  { codigo: "5", texto: "5. Fortalecer la producción nacional y la inversión extranjera" },
  { codigo: "6", texto: "6. Precautelar el uso sostenible de los recursos naturales" },
  { codigo: "7", texto: "7. Impulsar infraestructuras sostenibles y resilientes" },
  { codigo: "8", texto: "8. Fortalecer la institucionalidad pública" },
  { codigo: "9", texto: "9. Fortalecer la resiliencia de ciudades y comunidades" },
];

export const POLITICAS_POR_OBJETIVO_PND: Record<string, IPndOpcion[]> = {
  "1": [
    { codigo: "1.1", texto: "1.1 Garantizar acceso universal a servicios de salud" },
    { codigo: "1.2", texto: "1.2 Erradicar la desnutrición crónica infantil" },
  ],
  "2": [
    { codigo: "2.1", texto: "2.1 Garantizar acceso a educación de calidad en todos los niveles" },
    { codigo: "2.2", texto: "2.2 Fomentar la formación técnica y superior pertinente" },
  ],
  "3": [
    { codigo: "3.1", texto: "3.1 Fortalecer la seguridad ciudadana y el acceso a la justicia" },
    { codigo: "3.2", texto: "3.2 Consolidar la soberanía y la gestión de fronteras" },
  ],
  "4": [
    { codigo: "4.1", texto: "4.1 Fomentar el empleo y el emprendimiento" },
    { codigo: "4.2", texto: "4.2 Promover la competitividad y la productividad" },
  ],
  "5": [
    { codigo: "5.1", texto: "5.1 Atraer inversión nacional y extranjera responsable" },
    { codigo: "5.2", texto: "5.2 Fortalecer cadenas de valor y exportaciones" },
  ],
  "6": [
    { codigo: "6.1", texto: "6.1 Promover la gestión sostenible de los recursos naturales" },
    { codigo: "6.2", texto: "6.2 Fortalecer la conservación del patrimonio natural" },
  ],
  "7": [
    { codigo: "7.1", texto: "7.1 Impulsar infraestructura vial, energética y de telecomunicaciones" },
    { codigo: "7.2", texto: "7.2 Fomentar ciudades resilientes ante desastres" },
  ],
  "8": [
    { codigo: "8.1", texto: "8.1 Modernizar la gestión pública y la transparencia" },
    { codigo: "8.2", texto: "8.2 Fortalecer la lucha contra la corrupción" },
  ],
  "9": [
    { codigo: "9.1", texto: "9.1 Fortalecer la gestión de riesgos y respuesta a desastres" },
    { codigo: "9.2", texto: "9.2 Promover la resiliencia comunitaria y territorial" },
  ],
};

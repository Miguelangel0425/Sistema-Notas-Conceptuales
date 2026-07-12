import { IOpcion } from "../interfaces/ICascada.js";

// Fuente: controles dropDownList "OE_OBJETIVO" (4 ítems) y "OE_ESTRATEGIA" (8 ítems) — datos 100% reales,
// extraídos directamente del documento .docm (ambos listados venían completos en la plantilla original).
export interface IOeOpcion extends IOpcion {}

export const OE_OBJETIVOS: IOeOpcion[] = [
  { codigo: "OE1", texto: "OE1. Incrementar la calidad académica y la innovación educativa" },
  { codigo: "OE2", texto: "OE2. Incrementar la calidad, impacto y visibilidad del conocimiento científico" },
  { codigo: "OE3", texto: "OE3. Mejorar el posicionamiento nacional e internacional de la Universidad" },
  { codigo: "OE4", texto: "OE4. Incrementar la efectividad de la Universidad" },
];

// El documento no distingue estrategias por objetivo (una sola lista de 8 estrategias a-h para
// cualquier OE seleccionado), así que se replica igual: todas las estrategias están disponibles
// para cualquier objetivo estratégico.
export const OE_ESTRATEGIAS: IOeOpcion[] = [
  { codigo: "a", texto: "a. Identificar actores clave y alianzas estratégicas" },
  { codigo: "b", texto: "b. Difundir cultura institucional y Ethos Militar" },
  { codigo: "c", texto: "c. Internacionalizar docencia, investigación y vinculación" },
  { codigo: "d", texto: "d. Desarrollar capacitación continua en áreas estratégicas" },
  { codigo: "e", texto: "e. Diversificar fuentes de financiamiento" },
  { codigo: "f", texto: "f. Fortalecer innovación social, abierta y transferencia tecnológica" },
  { codigo: "g", texto: "g. Fortalecer educación continua, posgrado y servicios especializados" },
];

import { IOpcion } from "../interfaces/ICascada.js"

export interface IOeOpcion extends IOpcion { }

export const OE_OBJETIVOS: IOeOpcion[] = [
    { codigo: "OE1", texto: "OE1. Incrementar la calidad académica y la innovación educativa" },
    { codigo: "OE2", texto: "OE2. Incrementar la calidad, impacto y visibilidad del conocimiento científico" },
    { codigo: "OE3", texto: "OE3. Mejorar el posicionamiento nacional e internacional de la Universidad" },
    { codigo: "OE4", texto: "OE4. Incrementar la efectividad de la Universidad" },
];

export const OE_ESTRATEGIAS: Record<string, IOeOpcion[]> = {
    "OE1": [
        { codigo: "a", texto: "a. Actualizar la oferta académica institucional"},
        { codigo: "b", texto: "b. Optimizar los ambientes de aprendizaje"},
        { codigo: "c", texto: "c. Mejorar los procesos de evaluación de aprendizajes"},
        { codigo: "d", texto: "d. Usar ciencia de datos en la investigación educativa"},
        { codigo: "e", texto: "e. Impulsar la proyección global de la universidad"},
        { codigo: "f", texto: "f. Potenciar capacidades académicas y de investigación"},
        { codigo: "g", texto: "g. Implementar programas de capacitación continua"},
    ],
    "OE2": [
        { codigo: "a", texto: "a. Generar publicaciones de alto impacto"},
        { codigo: "b", texto: "b. Gestionar recursos para investigación e innovación"},
        { codigo: "c", texto: "c. Potenciar la transferencia tecnológica"},
        { codigo: "d", texto: "d. Establecer mecanismos de cooperación I+D+i"},
        { codigo: "e", texto: "e. Impulsar participación global de académicos y científicos"},
        { codigo: "f", texto: "f. Implementar sistema de gestión del conocimiento científico"},
        { codigo: "g", texto: "g. Potenciar comunicación y difusión de investigación"},
        { codigo: "h", texto: "h. Optimizar la gestión del sistema de investigación"},
        { codigo: "i", texto: "i. Crear plan de vigilancia tecnológica e inteligencia estratégica"},
    ],
    "OE3": [
        { codigo: "a", texto:"a. Identificar actores clave y alianzas estratégicas"},
        { codigo: "b", texto:"b. Difundir cultura institucional y Ethos Militar"},
        { codigo: "c", texto:"c. Internacionalizar docencia, investigación y vinculación"},
        { codigo: "d", texto:"d. Desarrollar capacitación continua en áreas estratégicas"},
        { codigo: "e", texto:"e. Diversificar fuentes de financiamiento"},
        { codigo: "f", texto:"f. Fortalecer innovación social, abierta y transferencia tecnológica"},
        { codigo: "g", texto:"g. Fortalecer educación continua, posgrado y servicios especializados"},
    ],
    "OE4": [
        {codigo: "a", texto:"a. Consolidar la transformación digital institucional"},
        {codigo: "b", texto:"b. Posicionar la identidad institucional"},
        {codigo: "c", texto:"c. Desarrollar posicionamiento institucional nacional e internacional"},
        {codigo: "d", texto:"d. Automatizar la gestión institucional de riesgos"},
        {codigo: "e", texto:"e. Transformar procesos administrativos y académicos"},
        {codigo: "f", texto:"f. Actualizar comunicación institucional interna y externa"},
        {codigo: "g", texto:"g. Optimizar gasto, ingresos y eficiencia operativa"},
        {codigo: "h", texto:"h. Mejorar infraestructura y equipamiento"},
        {codigo: "i", texto:"i. Optimizar planes de bienestar laboral"},
        {codigo: "j", texto:"j. Diseñar modelo operativo por procesos"},
    ],
}
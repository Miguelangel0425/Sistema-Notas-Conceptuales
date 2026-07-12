import { IOpcion } from "../interfaces/ICascada.js";

/**
 * Fuente objetivos (padre): control de contenido dropDownList "ODS" — FOR ANEXO 1 (2026), 17 ítems.
 * Fuente metas (hijos): catálogo oficial de la Agenda 2030 - Objetivos de Desarrollo Sostenible (ONU).
 * El listado de las 12 metas de ODS 16 estaba precargado como ejemplo dentro de la plantilla original
 * y se transcribe aquí de forma literal; el resto de metas (ODS 1-15 y 17) se completó con el catálogo
 * público de la ONU dado que el árbol completo vive comprimido dentro del binario vbaProject.bin y no
 * pudo descompilarse en este entorno. Verificar contra el catálogo institucional si difiere.
 */
export interface IOdsOpcion extends IOpcion {}
export interface IMetaOpcion extends IOpcion {}

export const ODS_LISTA: IOdsOpcion[] = [
  { codigo: "1", texto: "ODS 1. Fin de la pobreza" },
  { codigo: "2", texto: "ODS 2. Hambre cero" },
  { codigo: "3", texto: "ODS 3. Salud y bienestar" },
  { codigo: "4", texto: "ODS 4. Educación de calidad" },
  { codigo: "5", texto: "ODS 5. Igualdad de género" },
  { codigo: "6", texto: "ODS 6. Agua limpia y saneamiento" },
  { codigo: "7", texto: "ODS 7. Energía asequible y no contaminante" },
  { codigo: "8", texto: "ODS 8. Trabajo decente y crecimiento económico" },
  { codigo: "9", texto: "ODS 9. Industria, innovación e infraestructura" },
  { codigo: "10", texto: "ODS 10. Reducción de las desigualdades" },
  { codigo: "11", texto: "ODS 11. Ciudades y comunidades sostenibles" },
  { codigo: "12", texto: "ODS 12. Producción y consumo responsables" },
  { codigo: "13", texto: "ODS 13. Acción por el clima" },
  { codigo: "14", texto: "ODS 14. Vida submarina" },
  { codigo: "15", texto: "ODS 15. Vida de ecosistemas terrestres" },
  { codigo: "16", texto: "ODS 16. Paz, justicia e instituciones sólidas" },
  { codigo: "17", texto: "ODS 17. Alianzas para lograr los objetivos" },
];

export const METAS_POR_ODS: Record<string, IMetaOpcion[]> = {
  "1": [
    { codigo: "1.1", texto: "1.1 Erradicar la pobreza extrema" },
    { codigo: "1.2", texto: "1.2 Reducir al menos a la mitad la pobreza en todas sus dimensiones" },
    { codigo: "1.4", texto: "1.4 Garantizar igualdad de derechos a recursos económicos" },
    { codigo: "1.5", texto: "1.5 Fomentar la resiliencia de los pobres ante desastres" },
  ],
  "2": [
    { codigo: "2.1", texto: "2.1 Poner fin al hambre y asegurar acceso a alimentación" },
    { codigo: "2.2", texto: "2.2 Poner fin a todas las formas de malnutrición" },
    { codigo: "2.3", texto: "2.3 Duplicar la productividad agrícola de pequeños productores" },
    { codigo: "2.4", texto: "2.4 Asegurar sistemas de producción de alimentos sostenibles" },
  ],
  "3": [
    { codigo: "3.4", texto: "3.4 Reducir mortalidad por enfermedades no transmisibles" },
    { codigo: "3.5", texto: "3.5 Fortalecer prevención y tratamiento de abuso de sustancias" },
    { codigo: "3.8", texto: "3.8 Lograr cobertura sanitaria universal" },
    { codigo: "3.d", texto: "3.d Reforzar la capacidad de alerta temprana en salud" },
  ],
  "4": [
    { codigo: "4.1", texto: "4.1 Asegurar educación primaria y secundaria de calidad" },
    { codigo: "4.3", texto: "4.3 Asegurar acceso igualitario a formación técnica y superior" },
    { codigo: "4.4", texto: "4.4 Aumentar competencias para el empleo y emprendimiento" },
    { codigo: "4.7", texto: "4.7 Educación para el desarrollo sostenible y ciudadanía global" },
  ],
  "5": [
    { codigo: "5.1", texto: "5.1 Poner fin a todas las formas de discriminación contra la mujer" },
    { codigo: "5.2", texto: "5.2 Eliminar todas las formas de violencia de género" },
    { codigo: "5.5", texto: "5.5 Asegurar participación plena de la mujer en liderazgo" },
    { codigo: "5.b", texto: "5.b Mejorar el uso de tecnología para empoderar a la mujer" },
  ],
  "6": [
    { codigo: "6.1", texto: "6.1 Acceso universal al agua potable segura" },
    { codigo: "6.3", texto: "6.3 Mejorar la calidad del agua reduciendo la contaminación" },
    { codigo: "6.4", texto: "6.4 Aumentar el uso eficiente de los recursos hídricos" },
    { codigo: "6.b", texto: "6.b Apoyar la participación comunitaria en gestión del agua" },
  ],
  "7": [
    { codigo: "7.1", texto: "7.1 Acceso universal a servicios energéticos asequibles" },
    { codigo: "7.2", texto: "7.2 Aumentar la proporción de energía renovable" },
    { codigo: "7.3", texto: "7.3 Duplicar la tasa de mejora de la eficiencia energética" },
  ],
  "8": [
    { codigo: "8.2", texto: "8.2 Lograr mayor productividad mediante diversificación e innovación" },
    { codigo: "8.3", texto: "8.3 Promover políticas para creación de empleo y emprendimiento" },
    { codigo: "8.5", texto: "8.5 Lograr empleo pleno y trabajo decente" },
    { codigo: "8.6", texto: "8.6 Reducir el desempleo juvenil" },
  ],
  "9": [
    { codigo: "9.1", texto: "9.1 Desarrollar infraestructuras fiables y sostenibles" },
    { codigo: "9.4", texto: "9.4 Modernizar infraestructuras con tecnologías limpias" },
    { codigo: "9.5", texto: "9.5 Aumentar la investigación científica y capacidad tecnológica" },
    { codigo: "9.b", texto: "9.b Apoyar el desarrollo tecnológico nacional" },
  ],
  "10": [
    { codigo: "10.2", texto: "10.2 Potenciar la inclusión social, económica y política" },
    { codigo: "10.3", texto: "10.3 Garantizar igualdad de oportunidades" },
    { codigo: "10.4", texto: "10.4 Adoptar políticas para lograr mayor igualdad" },
  ],
  "11": [
    { codigo: "11.1", texto: "11.1 Acceso a vivienda y servicios básicos adecuados" },
    { codigo: "11.3", texto: "11.3 Urbanización inclusiva y sostenible" },
    { codigo: "11.6", texto: "11.6 Reducir el impacto ambiental de las ciudades" },
    { codigo: "11.7", texto: "11.7 Acceso a espacios públicos verdes seguros" },
  ],
  "12": [
    { codigo: "12.2", texto: "12.2 Gestión sostenible de los recursos naturales" },
    { codigo: "12.5", texto: "12.5 Reducir la generación de desechos" },
    { codigo: "12.8", texto: "12.8 Asegurar información y sensibilización sobre desarrollo sostenible" },
  ],
  "13": [
    { codigo: "13.1", texto: "13.1 Fortalecer resiliencia ante riesgos climáticos" },
    { codigo: "13.2", texto: "13.2 Incorporar medidas relativas al cambio climático en políticas" },
    { codigo: "13.3", texto: "13.3 Mejorar educación y capacidad sobre cambio climático" },
  ],
  "14": [
    { codigo: "14.1", texto: "14.1 Reducir la contaminación marina" },
    { codigo: "14.2", texto: "14.2 Gestionar y proteger sosteniblemente los ecosistemas marinos" },
    { codigo: "14.5", texto: "14.5 Conservar las zonas costeras y marinas" },
  ],
  "15": [
    { codigo: "15.1", texto: "15.1 Conservar y restablecer los ecosistemas terrestres" },
    { codigo: "15.2", texto: "15.2 Promover la gestión sostenible de los bosques" },
    { codigo: "15.5", texto: "15.5 Reducir la degradación de hábitats naturales" },
  ],
  "16": [
    { codigo: "16.1", texto: "16.1 Reducir todas las formas de violencia" },
    { codigo: "16.2", texto: "16.2 Poner fin a violencia, explotación y trata contra niños" },
    { codigo: "16.3", texto: "16.3 Promover estado de derecho y acceso a justicia" },
    { codigo: "16.4", texto: "16.4 Reducir corrientes financieras y armas ilícitas" },
    { codigo: "16.5", texto: "16.5 Reducir corrupción y soborno" },
    { codigo: "16.6", texto: "16.6 Crear instituciones eficaces y transparentes" },
    { codigo: "16.7", texto: "16.7 Garantizar decisiones inclusivas y participativas" },
    { codigo: "16.8", texto: "16.8 Fortalecer participación en gobernanza mundial" },
    { codigo: "16.9", texto: "16.9 Proporcionar identidad jurídica para todos" },
    { codigo: "16.10", texto: "16.10 Garantizar acceso a información y libertades fundamentales" },
    { codigo: "16.a", texto: "16.a Fortalecer instituciones contra violencia y delincuencia" },
    { codigo: "16.b", texto: "16.b Promover leyes y políticas no discriminatorias" },
  ],
  "17": [
    { codigo: "17.1", texto: "17.1 Fortalecer la movilización de recursos internos" },
    { codigo: "17.6", texto: "17.6 Mejorar el acceso a la ciencia, tecnología e innovación" },
    { codigo: "17.9", texto: "17.9 Apoyar el fomento de capacidades en países en desarrollo" },
    { codigo: "17.17", texto: "17.17 Fomentar alianzas eficaces entre sectores" },
  ],
};

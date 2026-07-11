import { IOpcion } from "../interfaces/ICascada.js";

export interface IPndOpcion extends IOpcion { }

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
        { codigo: "1.1", texto: "1.1 Promover derechos y reducir pobreza" },
        { codigo: "1.2", texto: "1.2 Garantizar servicios de protección social" },
        { codigo: "1.3", texto: "1.3 Mejorar servicios integrales de salud" },
        { codigo: "1.4", texto: "1.4 Fortalecer prevención y control de enfermedades" },
        { codigo: "1.5", texto: "1.5 Garantizar salud sexual y reproductiva" },
        { codigo: "1.6", texto: "1.6 Fortalecer atención al desarrollo integral" },
        { codigo: "1.7", texto: "1.7 Garantizar vivienda adecuada y entornos seguros" },
    ],
    "2": [
        { codigo: "2.1", texto: "2.1 Garantizar educación inclusiva, equitativa e intercultural" },
        { codigo: "2.2", texto: "2.2 Promover educación de calidad e innovadora" },
        { codigo: "2.3", texto: "2.3 Impulsar educación superior transparente e innovadora" },
        { codigo: "2.4", texto: "2.4 Impulsar investigación, innovación y transferencia tecnológica" },
        { codigo: "2.5", texto: "2.5 Fomentar actividad física y deporte" },
        { codigo: "2.6", texto: "2.6 Fomentar patrimonio, creación artística e industrias culturales" },
    ],
    "3": [
        { codigo: "3.1", texto: "3.1 Proteger soberanía e integridad territorial" },
        { codigo: "3.2", texto: "3.2 Promover convivencia pacífica y seguridad ciudadana" },
        { codigo: "3.3", texto: "3.3 Potenciar inteligencia y contrainteligencia del Estado" },
        { codigo: "3.4", texto: "3.4 Consolidar rehabilitación social y reinserción" },
        { codigo: "3.5", texto: "3.5 Promover acceso a justicia inclusiva" },
        { codigo: "3.6", texto: "3.6 Prevenir y erradicar violencia" },
    ],
    "4": [
        { codigo: "4.1", texto: "4.1 Fortalecer finanzas públicas" },
        { codigo: "4.2", texto: "4.2 Gestionar reservas internacionales" },
        { codigo: "4.3", texto: "4.3 Promover inclusión financiera" },
        { codigo: "4.4", texto: "4.4 Promover empleo adecuado e inserción laboral" },
    ],
    "5": [
        { codigo: "5.1", texto: "5.1 Mejorar competitividad de MiPymes y agroindustrias" },
        { codigo: "5.2", texto: "5.2 Impulsar competitividad acuícola y pesquera" },
        { codigo: "5.3", texto: "5.3 Implementar modelo productivo sostenible e innovador" },
        { codigo: "5.4", texto: "5.4 Establecer marco regulatorio para inversión" },
        { codigo: "5.5", texto: "5.5 Consolidar turismo como desarrollo territorial" },
        { codigo: "5.6", texto: "5.6 Potenciar producción agropecuaria con valor agregado" },
        { codigo: "5.7", texto: "5.7 Impulsar productividad agropecuaria" },
        { codigo: "5.8", texto: "5.8 Impulsar inclusión económica y social" },
    ],
    "6": [
        { codigo: "6.1", texto: "6.1 Garantizar servicio de energía eléctrica" },
        { codigo: "6.2", texto: "6.2 Fortalecer desarrollo responsable del sector minero" },
        { codigo: "6.3", texto: "6.3 Gestionar recursos no renovables e hidrocarburos" },
        { codigo: "6.4", texto: "6.4 Conservar y restaurar patrimonio natural" },
        { codigo: "6.5", texto: "6.5 Promover gestión integral del recurso hídrico" },
    ],
    "7": [
        { codigo: "7.1", texto: "7.1 Impulsar desarrollo digital y conectividad" },
        { codigo: "7.2", texto: "7.2 Fortalecer transporte multimodal e infraestructura resiliente" },
    ],
    "8": [
        { codigo: "8.1", texto: "8.1 Propiciar participación ciudadana y control social" },
        { codigo: "8.2", texto: "8.2 Consolidar gobernabilidad democrática" },
        { codigo: "8.3", texto: "8.3 Impulsar transformación digital del Estado" },
        { codigo: "8.4", texto: "8.4 Promover inserción internacional y cooperación" },
    ],
    "9": [
        { codigo: "9.1", texto: "9.1 Mejorar respuesta institucional ante emergencias" },
        { codigo: "9.2", texto: "9.2 Promover resiliencia de infraestructura estratégica" },
        { codigo: "9.3", texto: "9.3 Mejorar gestión de riesgos y sostenibilidad ambiental" },
    ],
};

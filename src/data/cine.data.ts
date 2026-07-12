import { IOpcion } from "../interfaces/ICascada.js";

/**
 * Fuente "Campo amplio" (padre): control dropDownList "CINE_AMPLIO".
 * Fuente "Campo específico" y "Campo detallado": CINE-F 2013.
 */
export interface ICineOpcion extends IOpcion {}

export const CINE_AMPLIO: ICineOpcion[] = [
  { codigo: "00", texto: "00 Programas y certificaciones genéricos" },
  { codigo: "01", texto: "01 Educación" },
  { codigo: "02", texto: "02 Artes y humanidades" },
  { codigo: "03", texto: "03 Ciencias sociales, periodismo e información" },
  { codigo: "04", texto: "04 Administración de empresas y derecho" },
  { codigo: "05", texto: "05 Ciencias naturales, matemáticas y estadística" },
  { codigo: "06", texto: "06 Tecnologías de la información y la comunicación (TIC)" },
  { codigo: "07", texto: "07 Ingeniería, industria y construcción" },
  { codigo: "08", texto: "08 Agricultura, silvicultura, pesca y veterinaria" },
  { codigo: "09", texto: "09 Salud y bienestar" },
  { codigo: "10", texto: "10 Servicios" },
];

export const CINE_ESPECIFICO_POR_AMPLIO: Record<string, ICineOpcion[]> = {
  "00": [
    { codigo: "001", texto: "001 Programas y certificaciones básicos" },
    { codigo: "002", texto: "002 Alfabetización y aritmética elemental" },
    { codigo: "003", texto: "003 Competencias personales y desarrollo" },
  ],
  "01": [
    { codigo: "011", texto: "011 Educación" },
  ],
  "02": [
    { codigo: "021", texto: "021 Artes" },
    { codigo: "022", texto: "022 Humanidades (excepto idiomas)" },
    { codigo: "023", texto: "023 Idiomas" },
  ],
  "03": [
    { codigo: "031", texto: "031 Ciencias sociales y del comportamiento" },
    { codigo: "032", texto: "032 Periodismo e información" },
  ],
  "04": [
    { codigo: "041", texto: "041 Administración de empresas" },
    { codigo: "042", texto: "042 Derecho" },
  ],
  "05": [
    { codigo: "051", texto: "051 Ciencias biológicas y afines" },
    { codigo: "052", texto: "052 Medio ambiente" },
    { codigo: "053", texto: "053 Ciencias físicas" },
    { codigo: "054", texto: "054 Matemáticas y estadística" },
  ],
  "06": [
    {
      codigo: "061",
      texto: "061 Tecnologías de la información y la comunicación",
    },
  ],
  "07": [
    { codigo: "071", texto: "071 Ingeniería y profesiones afines" },
    { codigo: "072", texto: "072 Industria y producción" },
    { codigo: "073", texto: "073 Arquitectura y construcción" },
  ],
  "08": [
    { codigo: "081", texto: "081 Agricultura" },
    { codigo: "082", texto: "082 Silvicultura" },
    { codigo: "083", texto: "083 Pesca" },
    { codigo: "084", texto: "084 Veterinaria" },
  ],
  "09": [
    { codigo: "091", texto: "091 Salud" },
    { codigo: "092", texto: "092 Bienestar" },
  ],
  "10": [
    { codigo: "101", texto: "101 Servicios personales" },
    {
      codigo: "102",
      texto: "102 Servicios de higiene y salud ocupacional",
    },
    { codigo: "103", texto: "103 Servicios de seguridad" },
    { codigo: "104", texto: "104 Servicios de transporte" },
  ],
};

export const CINE_DETALLADO_POR_ESPECIFICO: Record<
  string,
  ICineOpcion[]
> = {
  "061": [
    { codigo: "0611", texto: "0611 Uso de computadoras" },
    {
      codigo: "0612",
      texto: "0612 Diseño y administración de bases de datos y redes",
    },
    {
      codigo: "0613",
      texto: "0613 Desarrollo y análisis de software y aplicaciones",
    },
  ],
  "071": [
    {
      codigo: "0710",
      texto: "0710 Ingeniería y profesiones afines",
    },
    { codigo: "0713", texto: "0713 Electricidad y energía" },
    {
      codigo: "0714",
      texto: "0714 Electrónica y automatización",
    },
  ],
  "091": [
    { codigo: "0911", texto: "0911 Odontología" },
    { codigo: "0912", texto: "0912 Medicina" },
    {
      codigo: "0913",
      texto: "0913 Enfermería y partería",
    },
  ],
  "051": [
    { codigo: "0511", texto: "0511 Biología" },
    { codigo: "0512", texto: "0512 Bioquímica" },
  ],
};

/**
 * Detalle genérico usado cuando el campo específico
 * no tiene un desglose detallado cargado.
 */
export const CINE_DETALLADO_GENERICO: ICineOpcion[] = [
  {
    codigo: "9999",
    texto: "Detalle general del campo específico seleccionado",
  },
];
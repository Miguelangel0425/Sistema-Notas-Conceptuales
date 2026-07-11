import { IOpcion } from '../interfaces/ICascada.js'

export interface ICineOpcion extends IOpcion { };

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
        { codigo: "003", texto: "003 Competencias personales y desarrollo" }
    ],
    "01": [
        { codigo: "011", texto: "011 Educación" }
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
    "06": [{ codigo: "061", texto: "061 Tecnologías de la información y la comunicación" }],
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
        { codigo: "103", texto: "103 Servicios de seguridad" },
    ],
};

export const CINE_DETALLADO_POR_ESPECIFICO: Record<string, ICineOpcion[]> = {
    "001": [
        { codigo: "0011", texto: "0011 Programas y certificaciones básicos" },
    ],
    "002": [
        { codigo: "0012", texto: "0012 Alfabetización y aritmética elemental" },
    ],
    "003": [
        { codigo: "0013", texto: "0013 Competencias personales y desarrollo" },
    ],
    "011": [
        { codigo: "0111", texto: "0111 Ciencias de la Educacion" },
        { codigo: "0112", texto: "0112 Formación para docentes de educación preprimaria" },
        { codigo: "0113", texto: "0113 Formación para docentes sin asignatura de especialización" },
        { codigo: "0114", texto: "0114 Formación para docentes con asignatura de especialización" },
    ],
    "021": [
        { codigo: "0211", texto: "0211 Técnicas audiovisuales y producción para medios de comunicación" },
        { codigo: "0212", texto: "0212 Diseño industrial de modas e interiores" },
        { codigo: "0213", texto: "0213 Bellas artes" },
        { codigo: "0214", texto: "0214 Artesanías" },
        { codigo: "0215", texto: "0214 Musicas y artes escénicas" },
    ],
    "022": [
        { codigo: "0221", texto: "0221 Religión y teología" },
        { codigo: "0222", texto: "0222 Historia y arqueologia" },
        { codigo: "0223", texto: "0223 Filosofía y ética" },
    ],
    "023": [
        { codigo: "0231", texto: "0231 Adquisición del lenguaje" },
        { codigo: "0232", texto: "0232 Literatura y lingüistica" },
    ],
    "031": [
        { codigo: "0311", texto: "0311 Economia" },
        { codigo: "0312", texto: "0312 Ciencias políticas y educación cívica" },
        { codigo: "0313", texto: "0313 Psicología" },
        { codigo: "0314", texto: "0314 Sociología y estudios culturales" },
    ],
    "032": [
        { codigo: "0321", texto: "0321 Periodismo y reportaje" },
        { codigo: "0322", texto: "0322 Bibliotecología, información y archivología" },
    ],
    "041": [
        { codigo: "0411", texto: "0411 Contabilidad e impuestos" },
        { codigo: "0412", texto: "0412 Gestión financiera, administración bancaria y seguros" },
        { codigo: "0412", texto: "0413 Gestión y administración" },
        { codigo: "0413", texto: "0414 Mercadotecnia y publicidad" },
        { codigo: "0414", texto: "0415 Secretariado y trabajo de oficina" },
        { codigo: "0415", texto: "0416 Ventas al por mayor y al por menor" },
        { codigo: "0416", texto: "0417 Competencias laborales" },
    ],
    "042": [
        { codigo: "0421", texto: "0421 Derecho" }
    ],
    "051": [
        { codigo: "0511", texto: "0511 Biologia" },
        { codigo: "0512", texto: "0512 Bioquímica" }
    ],
    "052": [
        { codigo: "0521", texto: "0521 Ciencias del medio ambiente" },
        { codigo: "0522", texto: "0522 Medio ambientes naturales y vida silvestre" },
    ],
    "053": [
        { codigo: "0531", texto: "0531 Química" },
        { codigo: "0532", texto: "0532 Ciencias de la tierra" },
        { codigo: "0533", texto: "0533 Física" },
    ],
    "054": [
        { codigo: "0541", texto: "0541 Matemáticas" },
        { codigo: "0542", texto: "0542 Estadística" },
    ],
    "061": [
        { codigo: "0611", texto: "0611 Uso de computadoras" },
        { codigo: "0612", texto: "0612 Diseño y administración de bases de datos y redes" },
        { codigo: "0613", texto: "0613 Desarrollo y análisis de software y aplicaciones" },
    ],
    "071": [
        { codigo: "0710", texto: "0710 Ingeniería y profesiones afines" },
        { codigo: "0713", texto: "0713 Electricidad y energía" },
        { codigo: "0714", texto: "0714 Electrónica y automatización" },
        { codigo: "0715", texto: "0715 Mecánica y profesiones afines a la metalistería" },
        { codigo: "0716", texto: "0716 Vehículos, barcos y aeronaves motorizadas" },
    ],
    "072": [
        { codigo: "0721", texto: "0721 Procesamiento de alimentos" },
        { codigo: "0722", texto: "0722 Materiales" },
        { codigo: "0723", texto: "0723 Productos textiles" },
        { codigo: "0724", texto: "0724 Minería y extracción" },
    ],
    "073": [
        { codigo: "0731", texto: "0731 Arquitectura y urbanismo" },
        { codigo: "0732", texto: "0732 Construcción e ingeniería civil" },
    ],
    "081": [
        { codigo: "0811", texto: "0811 Producción agrícola y ganadera" },
        { codigo: "0812", texto: "0812 Horticultura" },
    ],
    "082": [
        { codigo: "0821", texto: "0821 Silvicultura" },
    ],
    "083": [
        { codigo: "0831", texto: "0831 Pesca" },
    ],
    "084": [
        { codigo: "0841", texto: "0841 Veterinaria" },
    ],
    "091": [
        { codigo: "0911", texto: "0911 Odontología" },
        { codigo: "0912", texto: "0912 Medicina" },
        { codigo: "0913", texto: "0913 Enfermería y partería" },
        { codigo: "0914", texto: "0914 Tecnología de diagnóstico y tratamiento médico" },
        { codigo: "0915", texto: "0915 Terapia y rehabilitación" },
        { codigo: "0916", texto: "0916 Farmacia" },
        { codigo: "0917", texto: "0917 Medicina y terapia tradicional y complementaria" },
    ],
    "092": [
        { codigo: "0921", texto: "0921 Asistencia a adultos mayores y discapacitados" },
        { codigo: "0922", texto: "0922 Asistencia a la infancia y servicios para jóvenes" },
        { codigo: "0923", texto: "0923 Trabajo social y orientación" },
    ],
    "101": [
        { codigo: "1011", texto: "1011 Servicios domésticos" },
        { codigo: "1012", texto: "1012 Peluquería y tratamientos de belleza" },
        { codigo: "1013", texto: "1013 Hotelería, restaurantes y servicios de banquetes" },
        { codigo: "1014", texto: "1014 Deportes" },
        { codigo: "1015", texto: "1015 Viajes, turismo y actividades recreativas" },
    ],
    "102": [
        { codigo: "1021", texto: "1021 Saneamiento de la comunidad" },
        { codigo: "1022", texto: "1022 Salud y protección laboral" },
    ],
    "103": [
        { codigo: "1031", texto: "1031 Educación militar y de defensa" },
        { codigo: "1032", texto: "1032 Protección de las personas y de la propiedad" },
    ],
    "104": [
        { codigo: "1041", texto: "1041 Servicios de Transporte" },
    ],
};

/** Detalle genérico usado cuando el campo específico aún no tiene un desglose detallado propio cargado. */
export const CINE_DETALLADO_GENERICO: ICineOpcion[] = [
    { codigo: "9999", texto: "Detalle general del campo específico seleccionado" },
];
import { IResultadoValidacion } from "./FechaValidator.js";

export class Validator {
  private static REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static REGEX_TELEFONO = /^(09\d{8}|0\d{9}|\+?\d{7,13})$/;

  public static validarNombreObligatorio(nombre: string): IResultadoValidacion {
    if (!nombre || nombre.trim().length === 0) {
      return { valido: false, mensaje: "El nombre es obligatorio." };
    }
    return { valido: true };
  }

  public static validarCorreoObligatorio(correo: string): IResultadoValidacion {
    if (!correo || correo.trim().length === 0) {
      return { valido: false, mensaje: "El correo es obligatorio." };
    }
    return { valido: true };
  }

  public static validarCorreoValido(correo: string): IResultadoValidacion {
    if (!Validator.REGEX_CORREO.test(correo)) {
      return { valido: false, mensaje: "El correo electrónico no tiene un formato válido." };
    }
    return { valido: true };
  }

  public static validarTelefonoValido(telefono: string): IResultadoValidacion {
    if (!Validator.REGEX_TELEFONO.test(telefono.trim())) {
      return { valido: false, mensaje: "El teléfono celular no tiene un formato válido." };
    }
    return { valido: true };
  }

  public static validarCampoObligatorio(valor: string, etiquetaCampo: string): IResultadoValidacion {
    if (!valor || valor.trim().length === 0) {
      return { valido: false, mensaje: `El campo "${etiquetaCampo}" es obligatorio.` };
    }
    return { valido: true };
  }

  public static validarCodigoUnico(codigo: string, codigosExistentes: string[]): IResultadoValidacion {
    if (codigosExistentes.includes(codigo)) {
      return { valido: false, mensaje: "El código ingresado ya existe. No se permiten códigos repetidos." };
    }
    return { valido: true };
  }

  public static validarNombreConvocatoriaUnico(nombre: string, existe: boolean): IResultadoValidacion {
    if (existe) {
      return { valido: false, mensaje: "Ya existe una convocatoria registrada con ese nombre." };
    }
    return { valido: true };
  }

  public static validarAlMenosUnaActividad(cantidad: number): IResultadoValidacion {
    if (cantidad === 0) {
      return { valido: false, mensaje: "Debe existir al menos una actividad en el cronograma." };
    }
    return { valido: true };
  }
}

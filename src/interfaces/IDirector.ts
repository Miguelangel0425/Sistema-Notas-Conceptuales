import { IPersona } from "./IPersona.js";

export interface IDirector extends IPersona {
  departamento: string;
  correo: string;
  telefono: string;
}

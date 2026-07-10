import {IPersona} from "./IPersona"

export interface IDirector extends IPersona {
    departamento: string;
    correo: string;
    telefono:string;
}
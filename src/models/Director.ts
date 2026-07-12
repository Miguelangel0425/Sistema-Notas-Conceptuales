import { IDirector } from "../interfaces/IDirector.js";

export class Director implements IDirector {
  private _id: string;
  private _nombres: string;
  private _apellidos: string;
  private _correo: string;
  private _telefono: string;
  private _departamento: string;

  constructor(
    id: string,
    nombres: string,
    apellidos: string,
    correo: string,
    telefono: string,
    departamento: string
  ) {
    this._id = id;
    this._nombres = nombres;
    this._apellidos = apellidos;
    this._correo = correo;
    this._telefono = telefono;
    this._departamento = departamento;
  }

  get id(): string {
    return this._id;
  }
  get nombres(): string {
    return this._nombres;
  }
  set nombres(v: string) {
    this._nombres = v;
  }
  get apellidos(): string {
    return this._apellidos;
  }
  set apellidos(v: string) {
    this._apellidos = v;
  }
  get correo(): string {
    return this._correo;
  }
  set correo(v: string) {
    this._correo = v;
  }
  get telefono(): string {
    return this._telefono;
  }
  set telefono(v: string) {
    this._telefono = v;
  }
  get departamento(): string {
    return this._departamento;
  }
  set departamento(v: string) {
    this._departamento = v;
  }

  public obtenerNombreCompleto(): string {
    return `${this._nombres} ${this._apellidos}`;
  }
}

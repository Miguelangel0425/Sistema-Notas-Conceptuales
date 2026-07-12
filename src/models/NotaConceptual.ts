import { INota } from "../interfaces/INota.js";
import { EstadoNota, estadoNotaEsEditable, estadoNotaEsEliminable } from "../enums/EstadoNota.js";
import { Cobertura } from "../enums/Cobertura.js";
import { SectorBeneficiario } from "../enums/SectorBeneficiario.js";
import { Director } from "./Director.js";
import { Departamento } from "./Departamento.js";
import { Carrera } from "./Carrera.js";
import { Alineamiento } from "./Alineamiento.js";
import { ImpactoEsperado } from "./ImpactoEsperado.js";
import { PoblacionBeneficiaria } from "./PoblacionBeneficiaria.js";
import { Presupuesto } from "./Presupuesto.js";
import { EntidadCooperante } from "./EntidadCooperante.js";
import { Cronograma } from "./Cronograma.js";

export interface ILocalizacion {
  provincia: string;
  canton: string;
  parroquia: string;
  barrioComunidad: string;
}

export class NotaConceptual implements INota {
  private _id: string;
  private _codigo: string;
  private _nombre: string;
  private _sedeUnidadAcademica: string;
  private _departamento: Departamento | null;
  private _fechaInicioPlanificada: Date;
  private _fechaFinPlanificada: Date;
  private _director: Director;
  private _cobertura: Cobertura[] = [];
  private _localizacion: ILocalizacion;
  private _sectorBeneficiario: SectorBeneficiario[] = [];
  private _alineamiento: Alineamiento;
  private _departamentosParticipantes: Departamento[] = [];
  private _carrerasParticipantes: Carrera[] = [];
  private _impactosEsperados: ImpactoEsperado[] = [];
  private _poblacionBeneficiaria: PoblacionBeneficiaria;
  private _presupuesto: Presupuesto;
  private _entidadesCooperantes: EntidadCooperante[] = [];
  private _cronograma: Cronograma;
  private _estado: EstadoNota;
  private _convocatoriaId: string;

  constructor(
    id: string,
    codigo: string,
    nombre: string,
    sedeUnidadAcademica: string,
    director: Director,
    fechaInicioPlanificada: Date,
    fechaFinPlanificada: Date,
    convocatoriaId: string
  ) {
    this._id = id;
    this._codigo = codigo;
    this._nombre = nombre;
    this._sedeUnidadAcademica = sedeUnidadAcademica;
    this._departamento = null;
    this._director = director;
    this._fechaInicioPlanificada = fechaInicioPlanificada;
    this._fechaFinPlanificada = fechaFinPlanificada;
    this._convocatoriaId = convocatoriaId;
    this._localizacion = { provincia: "", canton: "", parroquia: "", barrioComunidad: "" };
    this._alineamiento = new Alineamiento();
    this._poblacionBeneficiaria = new PoblacionBeneficiaria();
    this._presupuesto = new Presupuesto();
    this._cronograma = new Cronograma();
    this._estado = EstadoNota.REGISTRADA;
  }

  get id(): string {
    return this._id;
  }
  get codigo(): string {
    return this._codigo;
  }
  get nombre(): string {
    return this._nombre;
  }
  set nombre(v: string) {
    this._nombre = v;
  }
  get sedeUnidadAcademica(): string {
    return this._sedeUnidadAcademica;
  }
  set sedeUnidadAcademica(v: string) {
    this._sedeUnidadAcademica = v;
  }
  get departamento(): Departamento | null {
    return this._departamento;
  }
  set departamento(v: Departamento | null) {
    this._departamento = v;
  }
  get fechaInicioPlanificada(): Date {
    return this._fechaInicioPlanificada;
  }
  set fechaInicioPlanificada(v: Date) {
    this._fechaInicioPlanificada = v;
  }
  get fechaFinPlanificada(): Date {
    return this._fechaFinPlanificada;
  }
  set fechaFinPlanificada(v: Date) {
    this._fechaFinPlanificada = v;
  }
  get director(): Director {
    return this._director;
  }
  set director(v: Director) {
    this._director = v;
  }
  get cobertura(): Cobertura[] {
    return this._cobertura;
  }
  set cobertura(v: Cobertura[]) {
    this._cobertura = v;
  }
  get localizacion(): ILocalizacion {
    return this._localizacion;
  }
  set localizacion(v: ILocalizacion) {
    this._localizacion = v;
  }
  get sectorBeneficiario(): SectorBeneficiario[] {
    return this._sectorBeneficiario;
  }
  set sectorBeneficiario(v: SectorBeneficiario[]) {
    this._sectorBeneficiario = v;
  }
  get alineamiento(): Alineamiento {
    return this._alineamiento;
  }
  get departamentosParticipantes(): Departamento[] {
    return this._departamentosParticipantes;
  }
  get carrerasParticipantes(): Carrera[] {
    return this._carrerasParticipantes;
  }
  get impactosEsperados(): ImpactoEsperado[] {
    return this._impactosEsperados;
  }
  get poblacionBeneficiaria(): PoblacionBeneficiaria {
    return this._poblacionBeneficiaria;
  }
  get presupuesto(): Presupuesto {
    return this._presupuesto;
  }
  get entidadesCooperantes(): EntidadCooperante[] {
    return this._entidadesCooperantes;
  }
  get cronograma(): Cronograma {
    return this._cronograma;
  }
  get estado(): EstadoNota {
    return this._estado;
  }
  get convocatoriaId(): string {
    return this._convocatoriaId;
  }

  /** "Una nota aprobada/rechazada no puede editarse. Solo registrada/en revisión son editables." */
  public esEditable(): boolean {
    return estadoNotaEsEditable(this._estado);
  }

  public puedeEliminarse(): boolean {
    return estadoNotaEsEliminable(this._estado);
  }

  public cambiarEstado(nuevo: EstadoNota): void {
    this._estado = nuevo;
  }

  /** "La nota conceptual únicamente podrá registrarse dentro del período de la convocatoria." */
  public validarFechasDentroDeConvocatoria(fechaInicioConv: Date, fechaFinConv: Date): boolean {
    return (
      this._fechaInicioPlanificada.getTime() >= fechaInicioConv.getTime() &&
      this._fechaFinPlanificada.getTime() <= fechaFinConv.getTime() &&
      this._fechaFinPlanificada.getTime() > this._fechaInicioPlanificada.getTime()
    );
  }

  public calcularPresupuestoTotal(): number {
    return this._presupuesto.calcularTotal();
  }
}

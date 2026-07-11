import { ODS } from './ODS.js';
import { PND } from './PND.js';
import { GAD } from './GAD.js';

export interface IAmbitoPrioritario {
    nombre: string,
    aplica: boolean;
}

export class Alineamiento {
    private _ambitosPrioritarios: IAmbitoPrioritario[];
    private _ods: ODS[] = [];
    private _cineAmplio: string = "";
    private _cineEspecifico: string = "";
    private _cineDetallado: string = "";
    private _pnd: PND | null = null;
    private _objetivosGAD: GAD[];
    private _objetivoEntidadCooperante: string = "";
    private _objetivoPlanEstrategico: string = "";
    private _estrategiaPlanEstrategico: string = "";
    private _lineasInvestigacion: string[] = [];
    private _dominioInstitucional: string = "";
    private _dominioAcademico: string = "";

    constructor() {
        this._ambitosPrioritarios = [
            { nombre: "Desarrollo Territorial y Fortalecimiento Comunitario", aplica: false },
            { nombre: "Sostenibilidad Ambiental y Green University", aplica: false },
            { nombre: "Innovación Social y Resiliencia Territorial", aplica: false },
        ];
        this._objetivosGAD = [new GAD("Provincial"), new GAD("Cantonal"), new GAD("Parroquial")];
    }
    get ambitosPrioritarios(): IAmbitoPrioritario[] {
        return this._ambitosPrioritarios;
    }
    get ods(): ODS[] {
        return this._ods;
    }
    get cineAmplio(): string {
        return this._cineAmplio;
    }
    set cineAmplio(v: string) {
        this._cineAmplio = v;
    }
    get cineEspecifico(): string {
        return this._cineEspecifico;
    }
    set cineEspecifico(v: string) {
        this._cineEspecifico = v;
    }
    get cineDetallado(): string {
        return this._cineDetallado;
    }
    set cineDetallado(v: string) {
        this._cineDetallado = v;
    }
    get pnd(): PND | null {
        return this._pnd;
    }
    set pnd(v: PND | null) {
        this._pnd = v;
    }
    get objetivosGAD(): GAD[] {
        return this._objetivosGAD;
    }
    get objetivoEntidadCooperante(): string {
        return this._objetivoEntidadCooperante;
    }
    set objetivoEntidadCooperante(v: string) {
        this._objetivoEntidadCooperante = v;
    }
    get objetivoPlanEstrategico(): string {
        return this._objetivoPlanEstrategico;
    }
    set objetivoPlanEstrategico(v: string) {
        this._objetivoPlanEstrategico = v;
    }
    get estrategiaPlanEstrategico(): string {
        return this._estrategiaPlanEstrategico;
    }
    set estrategiaPlanEstrategico(v: string) {
        this._estrategiaPlanEstrategico = v;
    }
    get lineasInvestigacion(): string[] {
        return this._lineasInvestigacion;
    }
    get dominioInstitucional(): string {
        return this._dominioInstitucional;
    }
    set dominioInstitucional(v: string) {
        this._dominioInstitucional = v;
    }
    get dominioAcademico(): string {
        return this._dominioAcademico;
    }
    set dominioAcademico(v: string) {
        this._dominioAcademico = v;
    }

    public agregarODS(o: ODS): void {
        if(this._ods.length >= 2){
            throw new Error("Solo se permiten hasta 2 objetivos ODS por Nota Conceptual.");
        }
        this._ods.push(o);
    }

    public removeODS(codigo:string): void {
        this._ods = this._ods.filter((o) => o.codigo !== codigo);
    }

    public agregarLineaInvestigacion(linea: string): void {
        if(this.lineasInvestigacion.length >= 2){
            throw new Error("Solo se permiten 2 líneas de investigación.");
        }
        if(!this._lineasInvestigacion.includes(linea)){
            this._lineasInvestigacion.push(linea);
        }
    }

    public removerLineaInvestigacion(linea:string): void {
        this._lineasInvestigacion = this._lineasInvestigacion.filter((l) => l !== linea);
    }

    public validarAlmenosUnAmbito(): boolean {
        return this.ambitosPrioritarios.some((a) => a.aplica);
    }
}
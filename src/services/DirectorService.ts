import { SistemaGestion } from "../models/SistemaGestion.js";
import { Director } from "../models/Director.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { Validator } from "../validators/Validator.js";
import { IResultadoValidacion } from "../validators/FechaValidator.js";

export class DirectorService {
    private sistema = SistemaGestion.obtenerInstancia();

    public listar(): Director[] {
        return this.sistema.directores;
    }

    public obtenerPorId(id: string): Director | null {
        return this.sistema.directores.find((d) => d.id === id) ?? null;
    }

    public buscarPorNombre(termino: string): Director[] {
        const t = termino.trim().toLowerCase();
        return this.sistema.directores.filter((d) => d.obtenerNombreCompleto().toLowerCase().includes(t));
    }

    private validarDatos(nombres: string, apellidos: string, correo: string, telefono: string): IResultadoValidacion {
        let v = Validator.validarNombreObligatorio(nombres);
        if (!v.valido) return v;
        v = Validator.validarCampoObligatorio(apellidos, "Apellidos");
        if (!v.valido) return v;
        v = Validator.validarCorreoObligatorio(correo);
        if (!v.valido) return v;
        v = Validator.validarCorreoValido(correo);
        if (!v.valido) return v;
        v = Validator.validarTelefonoValido(telefono);
        if (!v.valido) return v;
        return { valido: true };
    }

    public crear(
        nombres: string,
        apellidos: string,
        correo: string,
        telefono: string,
        departamento: string
    ): IResultadoValidacion & { director?: Director } {
        const v = this.validarDatos(nombres, apellidos, correo, telefono);
        if (!v.valido) return v;

        const director = new Director(IdGenerator.generar("DIR"), nombres, apellidos, correo, telefono, departamento);
        this.sistema.registrarDirector(director);
        return { valido: true, director };
    }

    public editar( id: string, nombres: string, apellidos: string, correo: string, telefono: string, departamento: string): IResultadoValidacion {
        const director = this.obtenerPorId(id);
        if (!director) return { valido: false, mensaje: "Director no encontrado." };

        const v = this.validarDatos(nombres, apellidos, correo, telefono);
        if (!v.valido) return v;

        director.nombres = nombres;
        director.apellidos = apellidos;
        director.correo = correo;
        director.telefono = telefono;
        director.departamento = departamento;
        this.sistema.eventBus.emit("director:actualizado", director);
        return { valido: true };
    }

    public eliminar(id: string): IResultadoValidacion {
        const enUso = this.sistema.notasConceptuales.some((n) => n.director.id === id);
        if (enUso) {
            return { valido: false, mensaje: "No se puede eliminar: el director está asignado a una o más notas conceptuales." };
        }
        this.sistema.eliminarDirector(id);
        return { valido: true };
    }
}

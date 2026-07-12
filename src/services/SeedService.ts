import { SistemaGestion } from "../models/SistemaGestion.js";
import { Convocatoria } from "../models/Convocatoria.js";
import { Director } from "../models/Director.js";
import { IdGenerator } from "../utils/IdGenerator.js";
import { DEPARTAMENTOS } from "../data/departamentos.data.js";

/**
 * Precarga datos base para que el sistema no arranque completamente vacío.
 * - Crea una Convocatoria por defecto (abierta, vigente por 6 meses) si no existe ninguna.
 * - Crea un Director de ejemplo por cada uno de los primeros departamentos del catálogo,
 *   para poder crear Notas Conceptuales de inmediato sin pasos previos.
 *
 * El catálogo completo de Departamentos (10 ítems reales del Anexo 1) ya vive precargado
 * en src/data/departamentos.data.ts y se usa directamente en los <select> del formulario;
 * no requiere un paso de "siembra" adicional porque no es una colección editable en memoria,
 * es un catálogo institucional fijo (igual que Sedes, ODS, CINE, PND, etc.).
 */
export class SeedService {
    public static ejecutar(): void {
        const sistema = SistemaGestion.obtenerInstancia();

        if (sistema.convocatorias.length === 0) {
            const hoy = new Date();
            const fechaFin = new Date(hoy);
            fechaFin.setMonth(fechaFin.getMonth() + 6);

            const convocatoriaBase = new Convocatoria(
                IdGenerator.generar("CONV"),
                "Convocatoria de Notas Conceptuales 2026",
                hoy,
                fechaFin
            );
            sistema.registrarConvocatoria(convocatoriaBase);
        }

        if (sistema.directores.length === 0) {
            const directoresBase: [string, string, string, string, string][] = [
                ["María", "Torres Vega", "mtorres@espe.edu.ec", "0991234567", DEPARTAMENTOS[0]],
                ["Carlos", "Ramírez Ponce", "cramirez@espe.edu.ec", "0987654321", DEPARTAMENTOS[1]],
            ];
            directoresBase.forEach(([nombres, apellidos, correo, telefono, departamento]) => {
                sistema.registrarDirector(
                    new Director(IdGenerator.generar("DIR"), nombres, apellidos, correo, telefono, departamento)
                );
            });
        }
    }
}
export class IdGenerator {
    private static contador = 0;

    /** Genera IDs únicos en memoria con prefijo legible (no requiere backend/UUID lib). */
    public static generar(prefijo: string): string {
        IdGenerator.contador += 1;
        const marcaTiempo = Date.now().toString(36);
        return `${prefijo}-${marcaTiempo}-${IdGenerator.contador}`;
    }

    /** Genera un código institucional tipo NC-2026-0001. */
    public static generarCodigoNota(numeroSecuencial: number): string {
        const anio = new Date().getFullYear();
        const secuencia = numeroSecuencial.toString().padStart(4, "0");
        return `NC-${anio}-${secuencia}`;
    }
}

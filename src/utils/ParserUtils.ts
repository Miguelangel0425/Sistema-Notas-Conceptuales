/**
 * Reemplazo en TypeScript de las funciones auxiliares VBA:
 * ObtenerNumeroODS, ObtenerNumeroOE, ObtenerNumeroPND, ObtenerPrimerCodigo.
 * Extraen el código/prefijo numérico o alfabético de un texto de lista desplegable,
 * p. ej. "ODS 16. Paz, justicia..." -> "16", "OE3. Mejorar el..." -> "3".
 */

export class ParserUtils {
    public static obtenerNumeroODS(textoSeleccionado: string): string {
        const match = textoSeleccionado.match(/ODS\s+(\d+)/i);
        return match ? match[1] : "";
    }

    public static obtenerNumeroOE(textoSeleccionado: string): string {
        const match = textoSeleccionado.match(/(OE\d+)/i);
        return match ? match[1] : "";
    }

    public static obtenerNumeroPND(textoSeleccionado: string): string {
        const match = textoSeleccionado.match(/^(\d+)\./);
        return match ? match[1] : "";
    }

    public static obtenerCodigoCine(textoSeleccionado: string): string {
        const match = textoSeleccionado.match(/^(\d+)/);
        return match ? match[1] : "";
    }

    /** Devuelve el primer código disponible de un arreglo de opciones (usado al recargar hijos). */
    public static obtenerPrimerCodigo<T extends { codigo: string }>(opciones: T[]): string {
        return opciones.length > 0 ? opciones[0].codigo : "";
    }
}
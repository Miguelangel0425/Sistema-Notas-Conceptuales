export class FormatUtils {
  public static formatearMoneda(valor: number): string {
    return `$ ${valor.toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  public static formatearFecha(fecha: Date): string {
    if (!fecha || isNaN(fecha.getTime())) return "-";
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  public static aFechaInput(fecha: Date): string {
    if (!fecha || isNaN(fecha.getTime())) return "";
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }

  public static desdeFechaInput(valor: string): Date {
    return new Date(`${valor}T00:00:00`);
  }
}

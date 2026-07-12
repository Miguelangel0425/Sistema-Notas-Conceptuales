export interface IPresupuesto {
  calcularSubtotal(cantidad: number, valorUnitario: number): number;
  calcularTotalGeneral(subtotales: number[]): number;
}

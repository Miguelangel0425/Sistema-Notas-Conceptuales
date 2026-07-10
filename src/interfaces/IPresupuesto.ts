export interface IPresupuesto{
    calcularSubtotal(cantidad:number, valorUnitaro:number):number;
    calcularTotalGeneral(subtotales: number[]):number;
}
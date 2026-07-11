import {IPresupuesto} from '../interfaces/IPresupuesto.js'

export class CalculadoraPresupuesto implements IPresupuesto{
    public calcularSubtotal(cantidad: number, valorUnitaro: number): number {
        return cantidad * valorUnitaro;
    }

    public calcularTotalGeneral(subtotales: number[]): number {
        return subtotales.reduce((acc,s) => acc + s,0);
    }
}
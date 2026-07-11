import { ItemPresupuesto } from "./ItemPresupuesto.js";
import { EntidadCooperante } from "./EntidadCooperante.js";
import { CalculadoraPresupuesto } from "./CalculadoraPresupuesto.js";

export const LIMITE_PRESUPUESTO_USD = 20000;

export class Presupuesto {
    private _items: ItemPresupuesto[] = [];
    private _entidadCooperante: EntidadCooperante | null = null;
    private readonly _calculadora: CalculadoraPresupuesto = new CalculadoraPresupuesto();

    get items(): ItemPresupuesto[] {
        return this._items;
    }
    get entidadCooperante(): EntidadCooperante | null {
        return this._entidadCooperante;
    }
    set entidadCooperante(v: EntidadCooperante | null) {
        this._entidadCooperante = v;
    }

    /** Agregar recalcula el total automáticamente (el total nunca se guarda, siempre se deriva). */
    public agregarItem(item: ItemPresupuesto): void {
        this._items.push(item);
    }

    /** Eliminar un ítem recalcula automáticamente el total. */
    public eliminarItem(id: string): void {
        this._items = this._items.filter((i) => i.id !== id);
    }

    public calcularTotal(): number {
        const subtotales = this._items.map((i) => i.calcularSubtotal());
        return this._calculadora.calcularTotalGeneral(subtotales);
    }

    public excedeLimite(): boolean {
        return this.calcularTotal() > LIMITE_PRESUPUESTO_USD;
    }

    public tieneAlMenosUnItem(): boolean {
        return this._items.length > 0;
    }
}

import { ItemPresupuesto } from "./ItemPresupuesto.js";

export class EntidadCooperante {
  private _id: string;
  private _nombre: string;
  private _items: ItemPresupuesto[] = [];

  constructor(id: string, nombre: string) {
    this._id = id;
    this._nombre = nombre;
  }

  get id(): string {
    return this._id;
  }
  get nombre(): string {
    return this._nombre;
  }
  set nombre(v: string) {
    this._nombre = v;
  }
  get items(): ItemPresupuesto[] {
    return this._items;
  }

  public agregarItem(item: ItemPresupuesto): void {
    this._items.push(item);
  }

  public eliminarItem(id: string): void {
    this._items = this._items.filter((i) => i.id !== id);
  }

  public calcularTotalAporte(): number {
    return this._items.reduce((acc, i) => acc + i.calcularSubtotal(), 0);
  }
}

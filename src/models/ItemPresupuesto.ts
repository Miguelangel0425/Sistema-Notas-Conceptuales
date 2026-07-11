export class ItemPresupuesto{
    private _id: string;
    private _nroItem:string;
    private _descripcionItem:string;
    private _nombreBienServicio:string;
    private _cantidad:number;
    private _valorUnitaro:number;

    constructor(id:string, nroItem:string, descripcionItem:string, nombreBienServicio:string, cantidad:number, valorUnitario: number){
        this._id = id;
        this._nroItem = nroItem;
        this._descripcionItem = descripcionItem;
        this._nombreBienServicio = nombreBienServicio;
        this._cantidad = cantidad;
        this._valorUnitaro = valorUnitario;
    }

    get id(): string {
        return this._id;
    }

    get nroItem():string {
        return this._nroItem;
    }

    set nroItem(v:string){
        this._nroItem = v;
    }

    get descripcionItem():string {
        return this._descripcionItem;
    }

    set descripcionItem(v:string) {
        this._descripcionItem = v;
    }

    get nombreBienServicio(): string{
        return this._nombreBienServicio;
    }

    set nombreBienServicio(v:string){
        this._nombreBienServicio = v;
    }

    get cantidad():number {
        return this._cantidad;
    }

    set cantidad(v:number) {
        this._cantidad = v;
    }

    get valorUnitario(): number {
        return this._valorUnitaro;
    }

    set valorUnitario(v:number){
        this._valorUnitaro = v;
    }

    public calcularSubtotal(): number{
        return this._cantidad * this._valorUnitaro;
    }
}
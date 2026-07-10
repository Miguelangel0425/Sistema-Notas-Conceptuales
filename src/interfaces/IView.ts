export interface IView{
    render(): HTMLElement;
    destroy?():void;
}
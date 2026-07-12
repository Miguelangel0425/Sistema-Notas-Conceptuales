/** Los tooltips se renderizan 100% con CSS (:hover + ::after) sobre atributo data-tooltip. */
export class Tooltip {
  public static adjuntar(el: HTMLElement, texto: string): HTMLElement {
    el.classList.add("tiene-tooltip");
    el.setAttribute("data-tooltip", texto);
    return el;
  }
}

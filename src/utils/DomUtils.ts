type Atributos = Record<string, string>;

export class DomUtils {
  public static crear<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    atributos: Atributos = {},
    hijos: (HTMLElement | string)[] = []
  ): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    Object.entries(atributos).forEach(([clave, valor]) => {
      if (clave === "class") el.className = valor;
      else if (clave === "html") el.innerHTML = valor;
      else el.setAttribute(clave, valor);
    });
    hijos.forEach((hijo) => {
      if (typeof hijo === "string") el.appendChild(document.createTextNode(hijo));
      else el.appendChild(hijo);
    });
    return el;
  }

  public static qs<T extends HTMLElement = HTMLElement>(selector: string, padre: ParentNode = document): T | null {
    return padre.querySelector<T>(selector);
  }

  public static qsa<T extends HTMLElement = HTMLElement>(selector: string, padre: ParentNode = document): T[] {
    return Array.from(padre.querySelectorAll<T>(selector));
  }

  public static limpiar(el: HTMLElement): void {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  public static poblarSelect(select: HTMLSelectElement, opciones: string[], placeholder: string): void {
    select.innerHTML = "";
    const optPlaceholder = document.createElement("option");
    optPlaceholder.value = "";
    optPlaceholder.textContent = placeholder;
    select.appendChild(optPlaceholder);
    opciones.forEach((texto) => {
      const opt = document.createElement("option");
      opt.value = texto;
      opt.textContent = texto;
      select.appendChild(opt);
    });
  }
}

import { SidebarView } from "./Sidebar.js";
import { NavbarView } from "./Navbar.js";

export class ShellView {
  public montar(raiz: HTMLElement): HTMLElement {
    raiz.innerHTML = "";
    const layout = document.createElement("div");
    layout.className = "app-layout";

    layout.appendChild(new SidebarView().render());

    const contenidoPrincipal = document.createElement("div");
    contenidoPrincipal.className = "app-contenido";
    contenidoPrincipal.appendChild(new NavbarView().render());

    const main = document.createElement("main");
    main.id = "app-root";
    main.className = "app-main";
    contenidoPrincipal.appendChild(main);

    layout.appendChild(contenidoPrincipal);
    raiz.appendChild(layout);
    return main;
  }
}

interface IEnlaceMenu {
  ruta: string;
  etiqueta: string;
  icono: string;
}

const ENLACES: IEnlaceMenu[] = [
  { ruta: "#/dashboard", etiqueta: "Dashboard", icono: "📊" },
  { ruta: "#/convocatorias", etiqueta: "Convocatorias", icono: "📢" },
  { ruta: "#/directores", etiqueta: "Directores", icono: "👤" },
  { ruta: "#/notas", etiqueta: "Notas Conceptuales", icono: "📝" },
  { ruta: "#/consultas", etiqueta: "Consultas", icono: "🔎" },
  { ruta: "#/reportes", etiqueta: "Reportes", icono: "📈" },
];

export class SidebarView {
  public render(): HTMLElement {
    const aside = document.createElement("aside");
    aside.className = "sidebar";

    const marca = document.createElement("div");
    marca.className = "sidebar-marca";
    marca.innerHTML = `<span class="sidebar-marca-icono">🏛</span><span>SIGNC</span>`;

    const nav = document.createElement("nav");
    nav.className = "sidebar-nav";
    ENLACES.forEach((enlace) => {
      const a = document.createElement("a");
      a.href = enlace.ruta;
      a.className = "sidebar-link";
      a.innerHTML = `<span class="sidebar-link-icono">${enlace.icono}</span><span>${enlace.etiqueta}</span>`;
      nav.appendChild(a);
    });

    aside.append(marca, nav);
    return aside;
  }
}

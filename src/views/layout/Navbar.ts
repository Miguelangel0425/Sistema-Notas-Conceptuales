export class NavbarView {
  public render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "navbar";

    const titulo = document.createElement("h1");
    titulo.className = "navbar-titulo";
    titulo.textContent = "Sistema de Gestión de Convocatoria de Notas Conceptuales";

    const subtitulo = document.createElement("span");
    subtitulo.className = "navbar-subtitulo";
    subtitulo.textContent = "Anexo 1 · Convocatoria de Notas Conceptuales 2026";

    const grupoTitulo = document.createElement("div");
    grupoTitulo.className = "navbar-grupo-titulo";
    grupoTitulo.append(titulo, subtitulo);

    header.appendChild(grupoTitulo);
    return header;
  }
}

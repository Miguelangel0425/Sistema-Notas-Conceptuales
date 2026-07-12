export class Modal {
  public static abrir(titulo: string, contenido: HTMLElement, alCerrar?: () => void): HTMLElement {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const header = document.createElement("div");
    header.className = "modal-header";
    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    const btnCerrar = document.createElement("button");
    btnCerrar.className = "modal-cerrar";
    btnCerrar.innerHTML = "&times;";
    btnCerrar.setAttribute("aria-label", "Cerrar");
    header.append(h3, btnCerrar);

    const body = document.createElement("div");
    body.className = "modal-body";
    body.appendChild(contenido);

    modal.append(header, body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("modal-visible"));

    const cerrar = () => {
      overlay.classList.remove("modal-visible");
      setTimeout(() => {
        overlay.remove();
        alCerrar?.();
      }, 200);
    };

    btnCerrar.addEventListener("click", cerrar);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cerrar();
    });

    return overlay;
  }

  public static cerrar(overlay: HTMLElement): void {
    overlay.classList.remove("modal-visible");
    setTimeout(() => overlay.remove(), 200);
  }
}

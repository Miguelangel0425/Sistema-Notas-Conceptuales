import { IView } from "../../interfaces/IView.js";
import { DirectorService } from "../../services/DirectorService.js";
import { ConfirmacionModal } from "../shared/ConfirmacionModal.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class DirectorListaView implements IView {
  private servicio = new DirectorService();

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-lista";

    const encabezado = document.createElement("div");
    encabezado.className = "vista-encabezado";
    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Directores de Nota Conceptual";
    const btnNuevo = document.createElement("button");
    btnNuevo.className = "btn btn-primario";
    btnNuevo.textContent = "+ Nuevo director";
    btnNuevo.addEventListener("click", () => Router.obtenerInstancia().navegar("#/directores/nuevo"));
    encabezado.append(titulo, btnNuevo);

    const card = document.createElement("div");
    card.className = "card";
    const directores = this.servicio.listar();

    if (directores.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "tabla-vacia";
      vacio.textContent = "No hay directores registrados todavía.";
      card.appendChild(vacio);
    } else {
      const tabla = document.createElement("table");
      tabla.className = "tabla-elegante";
      tabla.innerHTML = `<thead><tr><th>Nombres y apellidos</th><th>Correo</th><th>Teléfono</th><th>Departamento</th><th>Acciones</th></tr></thead>`;
      const tbody = document.createElement("tbody");
      directores.forEach((d) => {
        const tr = document.createElement("tr");
        [d.obtenerNombreCompleto(), d.correo, d.telefono, d.departamento].forEach((valor) => {
          const td = document.createElement("td");
          td.textContent = valor;
          tr.appendChild(td);
        });
        const tdAcciones = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-icono btn-peligro-outline";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          ConfirmacionModal.confirmar(`¿Eliminar al director "${d.obtenerNombreCompleto()}"?`, () => {
            const r = this.servicio.eliminar(d.id);
            if (r.valido) {
              Alerta.exito("Director eliminado.");
              Router.obtenerInstancia().refrescar();
            } else Alerta.error(r.mensaje ?? "No se pudo eliminar.");
          });
        });
        tdAcciones.appendChild(btnEliminar);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      card.appendChild(tabla);
    }

    contenedor.append(encabezado, card);
    return contenedor;
  }
}

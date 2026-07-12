import { IView } from "../../interfaces/IView.js";
import { NotaConceptualService } from "../../services/NotaConceptualService.js";
import { etiquetaEstadoNota } from "../../enums/EstadoNota.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { ConfirmacionModal } from "../shared/ConfirmacionModal.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class NotaListaView implements IView {
  private servicio = new NotaConceptualService();

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-lista";

    const encabezado = document.createElement("div");
    encabezado.className = "vista-encabezado";
    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Notas Conceptuales";
    const btnNueva = document.createElement("button");
    btnNueva.className = "btn btn-primario";
    btnNueva.textContent = "+ Nueva nota conceptual";
    btnNueva.addEventListener("click", () => Router.obtenerInstancia().navegar("#/notas/nueva"));
    encabezado.append(titulo, btnNueva);

    const card = document.createElement("div");
    card.className = "card";
    const notas = this.servicio.listar();

    if (notas.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "tabla-vacia";
      vacio.textContent = "No hay notas conceptuales registradas todavía.";
      card.appendChild(vacio);
    } else {
      const tabla = document.createElement("table");
      tabla.className = "tabla-elegante";
      tabla.innerHTML = `<thead><tr><th>Código</th><th>Nombre</th><th>Director</th><th>Presupuesto</th><th>Estado</th><th>Acciones</th></tr></thead>`;
      const tbody = document.createElement("tbody");
      notas.forEach((n) => {
        const tr = document.createElement("tr");
        [n.codigo, n.nombre, n.director.obtenerNombreCompleto(), FormatUtils.formatearMoneda(n.calcularPresupuestoTotal())].forEach((v) => {
          const td = document.createElement("td");
          td.textContent = v;
          tr.appendChild(td);
        });
        const tdEstado = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `badge badge-${n.estado.toLowerCase()}`;
        badge.textContent = etiquetaEstadoNota(n.estado);
        tdEstado.appendChild(badge);
        tr.appendChild(tdEstado);

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "celda-acciones";
        const btnVer = document.createElement("button");
        btnVer.className = "btn btn-icono btn-secundario";
        btnVer.textContent = "Ver / Editar";
        btnVer.addEventListener("click", () => Router.obtenerInstancia().navegar(`#/notas/${n.id}`));
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-icono btn-peligro-outline";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.disabled = !n.puedeEliminarse();
        btnEliminar.addEventListener("click", () => {
          ConfirmacionModal.confirmar(`¿Eliminar la nota "${n.nombre}" (${n.codigo})?`, () => {
            const r = this.servicio.eliminar(n.id);
            if (r.valido) {
              Alerta.exito("Nota conceptual eliminada.");
              Router.obtenerInstancia().refrescar();
            } else Alerta.error(r.mensaje ?? "No se pudo eliminar.");
          });
        });
        tdAcciones.append(btnVer, btnEliminar);
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

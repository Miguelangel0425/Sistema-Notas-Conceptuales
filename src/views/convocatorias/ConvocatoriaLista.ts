import { IView } from "../../interfaces/IView.js";
import { ConvocatoriaService } from "../../services/ConvocatoriaService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { etiquetaEstadoConvocatoria } from "../../enums/EstadoConvocatoria.js";
import { ConfirmacionModal } from "../shared/ConfirmacionModal.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class ConvocatoriaListaView implements IView {
  private servicio = new ConvocatoriaService();

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-lista";

    const encabezado = document.createElement("div");
    encabezado.className = "vista-encabezado";
    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Convocatorias";
    const btnNueva = document.createElement("button");
    btnNueva.className = "btn btn-primario";
    btnNueva.textContent = "+ Nueva convocatoria";
    btnNueva.addEventListener("click", () => Router.obtenerInstancia().navegar("#/convocatorias/nueva"));
    encabezado.append(titulo, btnNueva);

    const tarjetaTabla = document.createElement("div");
    tarjetaTabla.className = "card";

    const convocatorias = this.servicio.listar();
    if (convocatorias.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "tabla-vacia";
      vacio.textContent = "No hay convocatorias registradas todavía.";
      tarjetaTabla.appendChild(vacio);
    } else {
      const tabla = document.createElement("table");
      tabla.className = "tabla-elegante";
      tabla.innerHTML = `<thead><tr><th>Nombre</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Notas</th><th>Acciones</th></tr></thead>`;
      const tbody = document.createElement("tbody");
      convocatorias.forEach((c) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        tdNombre.textContent = c.nombre;
        const tdInicio = document.createElement("td");
        tdInicio.textContent = FormatUtils.formatearFecha(c.fechaInicio);
        const tdFin = document.createElement("td");
        tdFin.textContent = FormatUtils.formatearFecha(c.fechaFin);
        const tdEstado = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `badge badge-${c.estado.toLowerCase()}`;
        badge.textContent = etiquetaEstadoConvocatoria(c.estado);
        tdEstado.appendChild(badge);
        const tdNotas = document.createElement("td");
        tdNotas.textContent = `${c.notas.length}`;

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "celda-acciones";
        const btnCerrar = document.createElement("button");
        btnCerrar.className = "btn btn-icono btn-secundario";
        btnCerrar.textContent = "Cerrar";
        btnCerrar.disabled = c.estado !== "ABIERTA";
        btnCerrar.addEventListener("click", () => {
          const r = this.servicio.cerrar(c.id);
          if (r.valido) {
            Alerta.exito("Convocatoria cerrada correctamente.");
            Router.obtenerInstancia().navegar("#/convocatorias");
          } else Alerta.error(r.mensaje ?? "No se pudo cerrar.");
        });
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-icono btn-peligro-outline";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          ConfirmacionModal.confirmar(`¿Eliminar la convocatoria "${c.nombre}"?`, () => {
            const r = this.servicio.eliminar(c.id);
            if (r.valido) {
              Alerta.exito("Convocatoria eliminada.");
              Router.obtenerInstancia().navegar("#/convocatorias");
            } else Alerta.error(r.mensaje ?? "No se pudo eliminar.");
          });
        });
        tdAcciones.append(btnCerrar, btnEliminar);
        tr.append(tdNombre, tdInicio, tdFin, tdEstado, tdNotas, tdAcciones);
        tbody.appendChild(tr);
      });
      tabla.appendChild(tbody);
      tarjetaTabla.appendChild(tabla);
    }

    contenedor.append(encabezado, tarjetaTabla);
    return contenedor;
  }
}

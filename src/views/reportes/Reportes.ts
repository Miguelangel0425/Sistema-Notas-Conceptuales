import { IView } from "../../interfaces/IView.js";
import { EstadisticasService } from "../../services/EstadisticasService.js";
import { NotaConceptualService } from "../../services/NotaConceptualService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { etiquetaEstadoNota } from "../../enums/EstadoNota.js";

export class ReportesView implements IView {
    private servicioEstadisticas = new EstadisticasService();
    private servicioNota = new NotaConceptualService();

    public render(): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "vista vista-reportes";

        const titulo = document.createElement("h2");
        titulo.className = "vista-titulo";
        titulo.textContent = "Reportes";

        const stats = this.servicioEstadisticas.obtener();
        const resumen = document.createElement("div");
        resumen.className = "card";
        resumen.innerHTML = `
      <h3 class="seccion-titulo">Resumen general</h3>
      <ul class="lista-resumen">
        <li>Convocatorias registradas: <strong>${stats.numeroConvocatorias}</strong></li>
        <li>Notas conceptuales totales: <strong>${stats.numeroNotas}</strong></li>
        <li>Directores registrados: <strong>${stats.numeroDirectores}</strong></li>
        <li>Presupuesto total comprometido: <strong>${FormatUtils.formatearMoneda(stats.presupuestoTotal)}</strong></li>
        <li>Notas aprobadas: <strong>${stats.notasAprobadas}</strong> · Rechazadas: <strong>${stats.notasRechazadas}</strong> · En revisión: <strong>${stats.notasEnRevision}</strong> · Registradas: <strong>${stats.notasRegistradas}</strong></li>
      </ul>
    `;

        const detalle = document.createElement("div");
        detalle.className = "card";
        const h3 = document.createElement("h3");
        h3.className = "seccion-titulo";
        h3.textContent = "Detalle de notas conceptuales";
        detalle.appendChild(h3);

        const notas = this.servicioNota.listar();
        if (notas.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "tabla-vacia";
            vacio.textContent = "No hay notas conceptuales registradas para reportar.";
            detalle.appendChild(vacio);
        } else {
            const tabla = document.createElement("table");
            tabla.className = "tabla-elegante";
            tabla.innerHTML = `<thead><tr><th>Código</th><th>Nombre</th><th>Sede</th><th>Presupuesto</th><th>Actividades</th><th>Estado</th></tr></thead>`;
            const tbody = document.createElement("tbody");
            notas.forEach((n) => {
                const tr = document.createElement("tr");
                [
                    n.codigo,
                    n.nombre,
                    n.sedeUnidadAcademica,
                    FormatUtils.formatearMoneda(n.calcularPresupuestoTotal()),
                    `${n.cronograma.actividades.length}`,
                    etiquetaEstadoNota(n.estado),
                ].forEach((v) => {
                    const td = document.createElement("td");
                    td.textContent = v;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            tabla.appendChild(tbody);
            detalle.appendChild(tabla);
        }

        contenedor.append(titulo, resumen, detalle);
        return contenedor;
    }
}

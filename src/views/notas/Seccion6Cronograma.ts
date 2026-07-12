import { NotaConceptual } from "../../models/NotaConceptual.js";
import { Actividad } from "../../models/Actividad.js";
import { CronogramaService } from "../../services/CronogramaService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { TablaDinamica } from "../shared/TablaDinamica.js";
import { Alerta } from "../shared/Alerta.js";

export class Seccion6CronogramaView {
    private servicio = new CronogramaService();

    public render(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const seccion = document.createElement("section");
        seccion.className = "seccion-form card";
        seccion.innerHTML = `<h3 class="seccion-titulo">6. Cronograma de ejecución</h3>`;

        const btnOrdenar = document.createElement("button");
        btnOrdenar.type = "button";
        btnOrdenar.className = "btn btn-secundario btn-pequeno";
        btnOrdenar.textContent = "Ordenar por fecha";
        btnOrdenar.addEventListener("click", () => {
            this.servicio.ordenarPorFecha(nota);
            alCambiar();
        });
        seccion.appendChild(btnOrdenar);

        seccion.appendChild(
            TablaDinamica.render({
                columnas: [
                    { titulo: "Actividad", render: (a: Actividad) => a.nombre },
                    { titulo: "Fecha inicio", render: (a: Actividad) => FormatUtils.formatearFecha(a.fechaInicio) },
                    { titulo: "Fecha fin", render: (a: Actividad) => FormatUtils.formatearFecha(a.fechaFin) },
                    { titulo: "Duración (días)", render: (a: Actividad) => `${a.duracionDias()}` },
                ],
                filas: nota.cronograma.actividades,
                onEliminar: soloLectura
                    ? undefined
                    : (act) => {
                        const r = this.servicio.eliminarActividad(nota, act.id);
                        if (r.valido) alCambiar();
                        else Alerta.error(r.mensaje ?? "No se pudo eliminar la actividad.");
                    },
                mensajeVacio: "No hay actividades registradas todavía.",
            })
        );

        if (!soloLectura) seccion.appendChild(this.formularioAgregarActividad(nota, alCambiar));
        return seccion;
    }

    private formularioAgregarActividad(nota: NotaConceptual, alCambiar: () => void): HTMLElement {
        const form = document.createElement("form");
        form.className = "formulario-inline";
        form.innerHTML = `
      <input type="text" id="nombreAct" placeholder="Nombre de la actividad" />
      <input type="date" id="inicioAct" />
      <input type="date" id="finAct" />
      <button type="submit" class="btn btn-secundario">+ Agregar actividad</button>
    `;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = form.querySelector<HTMLInputElement>("#nombreAct")!.value.trim();
            const inicioStr = form.querySelector<HTMLInputElement>("#inicioAct")!.value;
            const finStr = form.querySelector<HTMLInputElement>("#finAct")!.value;
            if (!inicioStr || !finStr) {
                Alerta.advertencia("Debe indicar la fecha de inicio y fin de la actividad.");
                return;
            }
            const resultado = this.servicio.agregarActividad(
                nota,
                nombre,
                FormatUtils.desdeFechaInput(inicioStr),
                FormatUtils.desdeFechaInput(finStr)
            );
            if (!resultado.valido) {
                Alerta.error(resultado.mensaje ?? "No se pudo agregar la actividad.");
                return;
            }
            alCambiar();
        });
        return form;
    }
}

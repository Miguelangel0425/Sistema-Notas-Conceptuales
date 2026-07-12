import { IView } from "../../interfaces/IView.js";
import { NotaConceptualService } from "../../services/NotaConceptualService.js";
import { ConvocatoriaService } from "../../services/ConvocatoriaService.js";
import { DirectorService } from "../../services/DirectorService.js";
import { DomUtils } from "../../utils/DomUtils.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { SEDES_UNIDADES_ACADEMICAS } from "../../data/sedesUnidadesAcademicas.data.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class NotaCrearView implements IView {
    private servicioNota = new NotaConceptualService();
    private servicioConvocatoria = new ConvocatoriaService();
    private servicioDirector = new DirectorService();

    public render(): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "vista vista-formulario";

        const titulo = document.createElement("h2");
        titulo.className = "vista-titulo";
        titulo.textContent = "Nueva nota conceptual — 1. Datos generales";

        const card = document.createElement("div");
        card.className = "card";

        const convocatorias = this.servicioConvocatoria.listar().filter((c) => c.admiteNuevasNotas());
        const directores = this.servicioDirector.listar();

        if (convocatorias.length === 0 || directores.length === 0) {
            const aviso = document.createElement("p");
            aviso.className = "tabla-vacia";
            aviso.textContent =
                convocatorias.length === 0
                    ? "No hay convocatorias abiertas disponibles. Registre una convocatoria antes de crear una nota."
                    : "No hay directores registrados. Registre un director antes de crear una nota.";
            card.appendChild(aviso);
            contenedor.append(titulo, card);
            return contenedor;
        }

        const form = document.createElement("form");
        form.className = "formulario";
        form.innerHTML = `
      <div class="campo-formulario">
        <label>Nombre del proyecto <span class="obligatorio">*</span></label>
        <input type="text" id="nombreNota" placeholder="Nombre de la nota conceptual" />
      </div>
      <div class="fila-campos">
        <div class="campo-formulario">
          <label>Sede/Unidad Académica <span class="obligatorio">*</span></label>
          <select id="sedeNota"></select>
        </div>
        <div class="campo-formulario">
          <label>Director <span class="obligatorio">*</span></label>
          <select id="directorNota"></select>
        </div>
      </div>
      <div class="fila-campos">
        <div class="campo-formulario">
          <label>Convocatoria <span class="obligatorio">*</span></label>
          <select id="convocatoriaNota"></select>
        </div>
      </div>
      <div class="fila-campos">
        <div class="campo-formulario">
          <label>Fecha inicio planificada <span class="obligatorio">*</span></label>
          <input type="date" id="inicioNota" />
        </div>
        <div class="campo-formulario">
          <label>Fecha fin planificada <span class="obligatorio">*</span></label>
          <input type="date" id="finNota" />
        </div>
      </div>
      <div class="acciones-formulario">
        <button type="button" class="btn btn-secundario" id="btnCancelar">Cancelar</button>
        <button type="submit" class="btn btn-primario">Crear y continuar con el formulario completo</button>
      </div>
    `;

        DomUtils.poblarSelect(form.querySelector("#sedeNota")!, SEDES_UNIDADES_ACADEMICAS, "Seleccione un elemento");
        const selectDirector = form.querySelector<HTMLSelectElement>("#directorNota")!;
        DomUtils.poblarSelect(
            selectDirector,
            directores.map((d) => d.obtenerNombreCompleto()),
            "Seleccione un elemento"
        );
        const selectConvocatoria = form.querySelector<HTMLSelectElement>("#convocatoriaNota")!;
        DomUtils.poblarSelect(
            selectConvocatoria,
            convocatorias.map((c) => `${c.nombre} (${FormatUtils.formatearFecha(c.fechaInicio)} - ${FormatUtils.formatearFecha(c.fechaFin)})`),
            "Seleccione un elemento"
        );

        form.querySelector<HTMLButtonElement>("#btnCancelar")!.addEventListener("click", () => {
            Router.obtenerInstancia().navegar("#/notas");
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = form.querySelector<HTMLInputElement>("#nombreNota")!.value.trim();
            const sede = form.querySelector<HTMLSelectElement>("#sedeNota")!.value;
            const directorTexto = selectDirector.value;
            const convocatoriaTexto = selectConvocatoria.value;
            const inicioStr = form.querySelector<HTMLInputElement>("#inicioNota")!.value;
            const finStr = form.querySelector<HTMLInputElement>("#finNota")!.value;

            if (!sede || !directorTexto || !convocatoriaTexto || !inicioStr || !finStr) {
                Alerta.advertencia("Complete todos los campos obligatorios.");
                return;
            }

            const director = directores.find((d) => d.obtenerNombreCompleto() === directorTexto)!;
            const indiceConv = Array.from(selectConvocatoria.options)
                .filter((o) => o.value)
                .findIndex((o) => o.value === convocatoriaTexto);
            const convocatoria = convocatorias[indiceConv];

            const resultado = this.servicioNota.crear(
                nombre,
                sede,
                director,
                FormatUtils.desdeFechaInput(inicioStr),
                FormatUtils.desdeFechaInput(finStr),
                convocatoria
            );

            if (!resultado.valido || !resultado.nota) {
                Alerta.error(resultado.mensaje ?? "No se pudo crear la nota conceptual.");
                return;
            }

            Alerta.exito(`Nota conceptual ${resultado.nota.codigo} creada. Continúe completando el resto de secciones.`);
            Router.obtenerInstancia().navegar(`#/notas/${resultado.nota.id}`);
        });

        card.appendChild(form);
        contenedor.append(titulo, card);
        return contenedor;
    }
}

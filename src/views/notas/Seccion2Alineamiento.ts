import { NotaConceptual } from "../../models/NotaConceptual.js";
import { CascadaSelectService } from "../../services/CascadaSelectService.js";
import { DomUtils } from "../../utils/DomUtils.js";
import { ODS_LISTA } from "../../data/ods.data.js";
import { CINE_AMPLIO } from "../../data/cine.data.js";
import { PND_OBJETIVOS } from "../../data/pnd.data.js";
import { OE_OBJETIVOS } from "../../data/planEstrategico.data.js";
import { LINEAS_INVESTIGACION } from "../../data/lineasInvestigacion.data.js";
import { DOMINIOS_INSTITUCIONALES, DOMINIOS_ACADEMICOS } from "../../data/dominiosAcademicos.data.js";
import { Alerta } from "../shared/Alerta.js";

export class Seccion2AlineamientoView {
    private cascadas = new CascadaSelectService();

    public render(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const seccion = document.createElement("section");
        seccion.className = "seccion-form card";
        seccion.innerHTML = `<h3 class="seccion-titulo">2. Alineamiento</h3>`;

        seccion.appendChild(this.renderAmbitos(nota, soloLectura));
        seccion.appendChild(this.renderCascadaODS(nota, soloLectura));
        seccion.appendChild(this.renderCascadaCine(nota, soloLectura));
        seccion.appendChild(this.renderCascadaPND(nota, soloLectura));
        seccion.appendChild(this.renderPlanEstrategico(nota, soloLectura));
        seccion.appendChild(this.renderLineasInvestigacion(nota, soloLectura, alCambiar));
        seccion.appendChild(this.renderDominio(nota, soloLectura));
        return seccion;
    }

    private renderAmbitos(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "campo-formulario";
        const label = document.createElement("label");
        label.textContent = "Ámbitos prioritarios de actuación (SI/NO)";
        contenedor.appendChild(label);

        const tabla = document.createElement("table");
        tabla.className = "tabla-elegante";
        const tbody = document.createElement("tbody");
        nota.alineamiento.ambitosPrioritarios.forEach((ambito) => {
            const tr = document.createElement("tr");
            const tdNombre = document.createElement("td");
            tdNombre.textContent = ambito.nombre;
            const tdSiNo = document.createElement("td");
            ["SI", "NO"].forEach((opcion) => {
                const label2 = document.createElement("label");
                label2.className = "radio-item";
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `ambito-${ambito.nombre}`;
                input.checked = (opcion === "SI") === ambito.aplica;
                input.disabled = soloLectura;
                input.addEventListener("change", () => {
                    ambito.aplica = opcion === "SI";
                });
                label2.append(input, document.createTextNode(" " + opcion));
                tdSiNo.appendChild(label2);
            });
            tr.append(tdNombre, tdSiNo);
            tbody.appendChild(tr);
        });
        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);
        return contenedor;
    }

    private renderCascadaODS(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "fila-campos";

        const campoODS = document.createElement("div");
        campoODS.className = "campo-formulario";
        const labelODS = document.createElement("label");
        labelODS.textContent = "ODS (Objetivo de Desarrollo Sostenible)";
        const selectODS = document.createElement("select");
        selectODS.disabled = soloLectura;
        DomUtils.poblarSelect(
            selectODS,
            ODS_LISTA.map((o) => o.texto),
            "Elija un elemento"
        );
        campoODS.append(labelODS, selectODS);

        const campoMeta = document.createElement("div");
        campoMeta.className = "campo-formulario";
        const labelMeta = document.createElement("label");
        labelMeta.textContent = "Meta ODS";
        const selectMeta = document.createElement("select");
        selectMeta.disabled = soloLectura;
        DomUtils.poblarSelect(selectMeta, [], "Seleccione primero un ODS");
        campoMeta.append(labelMeta, selectMeta);

        selectODS.addEventListener("change", () => {
            const metas = this.cascadas.obtenerMetasPorODS(selectODS.value);
            DomUtils.poblarSelect(
                selectMeta,
                metas.map((m) => m.texto),
                "Elija un elemento"
            );
        });

        contenedor.append(campoODS, campoMeta);
        return contenedor;
    }

    private renderCascadaCine(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "fila-campos";

        const crearCampo = (etiqueta: string) => {
            const campo = document.createElement("div");
            campo.className = "campo-formulario";
            const label = document.createElement("label");
            label.textContent = etiqueta;
            const select = document.createElement("select");
            select.disabled = soloLectura;
            campo.append(label, select);
            return { campo, select };
        };

        const amplio = crearCampo("Campo amplio (CINE-UNESCO)");
        DomUtils.poblarSelect(
            amplio.select,
            CINE_AMPLIO.map((c) => c.texto),
            "Elija un elemento"
        );

        const especifico = crearCampo("Campo específico");
        DomUtils.poblarSelect(especifico.select, [], "Seleccione primero un campo amplio");

        const detallado = crearCampo("Campo detallado");
        DomUtils.poblarSelect(detallado.select, [], "Seleccione primero un campo específico");

        amplio.select.addEventListener("change", () => {
            const especificos = this.cascadas.obtenerCineEspecificoPorAmplio(amplio.select.value);
            DomUtils.poblarSelect(
                especifico.select,
                especificos.map((e) => e.texto),
                "Elija un elemento"
            );
            DomUtils.poblarSelect(detallado.select, [], "Seleccione primero un campo específico");
        });

        especifico.select.addEventListener("change", () => {
            const detallados = this.cascadas.obtenerCineDetalladoPorEspecifico(especifico.select.value);
            DomUtils.poblarSelect(
                detallado.select,
                detallados.map((d) => d.texto),
                "Elija un elemento"
            );
        });

        contenedor.append(amplio.campo, especifico.campo, detallado.campo);
        return contenedor;
    }

    private renderCascadaPND(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "fila-campos";

        const campoObjetivo = document.createElement("div");
        campoObjetivo.className = "campo-formulario";
        const labelObjetivo = document.createElement("label");
        labelObjetivo.textContent = "Objetivo PND";
        const selectObjetivo = document.createElement("select");
        selectObjetivo.disabled = soloLectura;
        DomUtils.poblarSelect(
            selectObjetivo,
            PND_OBJETIVOS.map((p) => p.texto),
            "Elija un elemento"
        );
        campoObjetivo.append(labelObjetivo, selectObjetivo);

        const campoPolitica = document.createElement("div");
        campoPolitica.className = "campo-formulario";
        const labelPolitica = document.createElement("label");
        labelPolitica.textContent = "Política PND";
        const selectPolitica = document.createElement("select");
        selectPolitica.disabled = soloLectura;
        DomUtils.poblarSelect(selectPolitica, [], "Seleccione primero un objetivo");
        campoPolitica.append(labelPolitica, selectPolitica);

        selectObjetivo.addEventListener("change", () => {
            const politicas = this.cascadas.obtenerPoliticasPorObjetivoPND(selectObjetivo.value);
            DomUtils.poblarSelect(
                selectPolitica,
                politicas.map((p) => p.texto),
                "Elija un elemento"
            );
        });

        contenedor.append(campoObjetivo, campoPolitica);
        return contenedor;
    }

    private renderPlanEstrategico(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "fila-campos";

        const campoOE = document.createElement("div");
        campoOE.className = "campo-formulario";
        const labelOE = document.createElement("label");
        labelOE.textContent = "Objetivo estratégico institucional (OE)";
        const selectOE = document.createElement("select");
        selectOE.disabled = soloLectura;
        DomUtils.poblarSelect(
            selectOE,
            OE_OBJETIVOS.map((o) => o.texto),
            "Elija un elemento"
        );
        campoOE.append(labelOE, selectOE);

        const campoEstrategia = document.createElement("div");
        campoEstrategia.className = "campo-formulario";
        const labelEstrategia = document.createElement("label");
        labelEstrategia.textContent = "Estrategia";
        const selectEstrategia = document.createElement("select");
        selectEstrategia.disabled = soloLectura;
        DomUtils.poblarSelect(selectEstrategia, [], "Seleccione primero un objetivo estratégico");
        campoEstrategia.append(labelEstrategia, selectEstrategia);

        selectOE.addEventListener("change", () => {
            const estrategias = this.cascadas.obtenerEstrategiasPorOE(selectOE.value);
            DomUtils.poblarSelect(
                selectEstrategia,
                estrategias.map((e) => e.texto),
                "Elija un elemento"
            );
        });

        contenedor.append(campoOE, campoEstrategia);
        return contenedor;
    }

    private renderLineasInvestigacion(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "campo-formulario";
        const label = document.createElement("label");
        label.textContent = "Líneas de investigación (máximo 2)";
        contenedor.appendChild(label);

        const listaActual = document.createElement("div");
        listaActual.className = "chips-lista";
        nota.alineamiento.lineasInvestigacion.forEach((linea) => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = linea;
            if (!soloLectura) {
                const btnX = document.createElement("button");
                btnX.type = "button";
                btnX.textContent = "×";
                btnX.addEventListener("click", () => {
                    nota.alineamiento.removerLineaInvestigacion(linea);
                    alCambiar();
                });
                chip.appendChild(btnX);
            }
            listaActual.appendChild(chip);
        });

        const select = document.createElement("select");
        select.disabled = soloLectura || nota.alineamiento.lineasInvestigacion.length >= 2;
        DomUtils.poblarSelect(select, LINEAS_INVESTIGACION, "Elija un elemento");
        select.addEventListener("change", () => {
            if (!select.value) return;
            try {
                nota.alineamiento.agregarLineaInvestigacion(select.value);
                alCambiar();
            } catch (err) {
                Alerta.advertencia((err as Error).message);
            }
        });

        contenedor.append(listaActual, select);
        return contenedor;
    }

    private renderDominio(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "fila-campos";

        const campoInst = document.createElement("div");
        campoInst.className = "campo-formulario";
        const labelInst = document.createElement("label");
        labelInst.textContent = "Dominio institucional";
        const selectInst = document.createElement("select");
        selectInst.disabled = soloLectura;
        DomUtils.poblarSelect(selectInst, DOMINIOS_INSTITUCIONALES, "Seleccione un elemento");
        selectInst.addEventListener("change", () => (nota.alineamiento.dominioInstitucional = selectInst.value));
        campoInst.append(labelInst, selectInst);

        const campoAcad = document.createElement("div");
        campoAcad.className = "campo-formulario";
        const labelAcad = document.createElement("label");
        labelAcad.textContent = "Dominio académico";
        const selectAcad = document.createElement("select");
        selectAcad.disabled = soloLectura;
        DomUtils.poblarSelect(selectAcad, DOMINIOS_ACADEMICOS, "Seleccione un elemento");
        selectAcad.addEventListener("change", () => (nota.alineamiento.dominioAcademico = selectAcad.value));
        campoAcad.append(labelAcad, selectAcad);

        contenedor.append(campoInst, campoAcad);
        return contenedor;
    }
}

import { NotaConceptual } from "../../models/NotaConceptual.js";
import { Departamento } from "../../models/Departamento.js";
import { Carrera } from "../../models/Carrera.js";
import { IdGenerator } from "../../utils/IdGenerator.js";
import { DomUtils } from "../../utils/DomUtils.js";
import { SEDES_UNIDADES_ACADEMICAS } from "../../data/sedesUnidadesAcademicas.data.js";
import { TablaDinamica } from "../shared/TablaDinamica.js";
import { Alerta } from "../shared/Alerta.js";

export class Seccion3DeptosCarrerasView {
    public render(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const seccion = document.createElement("section");
        seccion.className = "seccion-form card";
        seccion.innerHTML = `<h3 class="seccion-titulo">3. Departamentos y carreras participantes</h3>`;

        seccion.appendChild(this.renderDepartamentos(nota, soloLectura, alCambiar));
        seccion.appendChild(this.renderCarreras(nota, soloLectura, alCambiar));
        return seccion;
    }

    private renderDepartamentos(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const bloque = document.createElement("div");
        bloque.className = "subseccion";
        const h4 = document.createElement("h4");
        h4.textContent = "3.1 Departamentos participantes";
        bloque.appendChild(h4);

        const totalDocentes = nota.departamentosParticipantes.reduce((acc, d) => acc + d.nroDocentesPlanificados, 0);
        bloque.appendChild(
            TablaDinamica.render({
                columnas: [
                    { titulo: "Sede/Unidad", render: (d: Departamento) => d.sedeUnidadAcademica },
                    { titulo: "Departamento", render: (d: Departamento) => d.nombre },
                    { titulo: "Objetivo de la nota", render: (d: Departamento) => d.objetivoNota },
                    { titulo: "Nro. docentes", render: (d: Departamento) => `${d.nroDocentesPlanificados}` },
                ],
                filas: nota.departamentosParticipantes,
                onEliminar: soloLectura
                    ? undefined
                    : (d) => {
                        nota.departamentosParticipantes.splice(nota.departamentosParticipantes.indexOf(d), 1);
                        alCambiar();
                    },
                filaTotales: ["TOTALES", "", "", `${totalDocentes}`],
                mensajeVacio: "No hay departamentos agregados todavía.",
            })
        );

        if (!soloLectura) bloque.appendChild(this.formularioAgregarDepartamento(nota, alCambiar));
        return bloque;
    }

    private formularioAgregarDepartamento(nota: NotaConceptual, alCambiar: () => void): HTMLElement {
        const form = document.createElement("form");
        form.className = "formulario-inline";
        form.innerHTML = `
      <select id="sedeDepto"></select>
      <input type="text" id="nombreDepto" placeholder="Departamento" />
      <input type="text" id="objetivoDepto" placeholder="Objetivo de la nota" />
      <input type="number" id="docentesDepto" placeholder="Nro. docentes" min="1" />
      <button type="submit" class="btn btn-secundario">+ Agregar</button>
    `;
        DomUtils.poblarSelect(form.querySelector("#sedeDepto")!, SEDES_UNIDADES_ACADEMICAS, "Seleccione un elemento");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const sede = form.querySelector<HTMLSelectElement>("#sedeDepto")!.value;
            const nombre = form.querySelector<HTMLInputElement>("#nombreDepto")!.value.trim();
            const objetivo = form.querySelector<HTMLInputElement>("#objetivoDepto")!.value.trim();
            const docentes = Number(form.querySelector<HTMLInputElement>("#docentesDepto")!.value);

            const depto = new Departamento(IdGenerator.generar("DEPTO"), nombre, sede, objetivo, docentes);
            if (!depto.validar()) {
                Alerta.advertencia("Complete todos los campos del departamento con valores válidos.");
                return;
            }
            nota.departamentosParticipantes.push(depto);
            alCambiar();
        });
        return form;
    }

    private renderCarreras(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
        const bloque = document.createElement("div");
        bloque.className = "subseccion";
        const h4 = document.createElement("h4");
        h4.textContent = "3.2 Carreras participantes";
        bloque.appendChild(h4);

        const totalEstudiantes = nota.carrerasParticipantes.reduce((acc, c) => acc + c.nroEstudiantesPlanificados, 0);
        bloque.appendChild(
            TablaDinamica.render({
                columnas: [
                    { titulo: "Sede/Unidad", render: (c: Carrera) => c.sedeUnidadAcademica },
                    { titulo: "Carrera", render: (c: Carrera) => c.nombre },
                    { titulo: "Objetivo de la nota", render: (c: Carrera) => c.objetivoNota },
                    { titulo: "Nro. estudiantes", render: (c: Carrera) => `${c.nroEstudiantesPlanificados}` },
                ],
                filas: nota.carrerasParticipantes,
                onEliminar: soloLectura
                    ? undefined
                    : (c) => {
                        nota.carrerasParticipantes.splice(nota.carrerasParticipantes.indexOf(c), 1);
                        alCambiar();
                    },
                filaTotales: ["TOTALES", "", "", `${totalEstudiantes}`],
                mensajeVacio: "No hay carreras agregadas todavía.",
            })
        );

        if (!soloLectura) bloque.appendChild(this.formularioAgregarCarrera(nota, alCambiar));
        return bloque;
    }

    private formularioAgregarCarrera(nota: NotaConceptual, alCambiar: () => void): HTMLElement {
        const form = document.createElement("form");
        form.className = "formulario-inline";
        form.innerHTML = `
      <select id="sedeCarrera"></select>
      <input type="text" id="nombreCarrera" placeholder="Carrera" />
      <input type="text" id="objetivoCarrera" placeholder="Objetivo de la nota" />
      <input type="number" id="estudiantesCarrera" placeholder="Nro. estudiantes" min="1" />
      <button type="submit" class="btn btn-secundario">+ Agregar</button>
    `;
        DomUtils.poblarSelect(form.querySelector("#sedeCarrera")!, SEDES_UNIDADES_ACADEMICAS, "Seleccione un elemento");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const sede = form.querySelector<HTMLSelectElement>("#sedeCarrera")!.value;
            const nombre = form.querySelector<HTMLInputElement>("#nombreCarrera")!.value.trim();
            const objetivo = form.querySelector<HTMLInputElement>("#objetivoCarrera")!.value.trim();
            const estudiantes = Number(form.querySelector<HTMLInputElement>("#estudiantesCarrera")!.value);

            const carrera = new Carrera(IdGenerator.generar("CARR"), nombre, sede, objetivo, estudiantes);
            if (!carrera.validar()) {
                Alerta.advertencia("Complete todos los campos de la carrera con valores válidos.");
                return;
            }
            nota.carrerasParticipantes.push(carrera);
            alCambiar();
        });
        return form;
    }
}

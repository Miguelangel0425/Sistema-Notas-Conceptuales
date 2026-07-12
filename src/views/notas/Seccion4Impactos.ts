import { NotaConceptual } from "../../models/NotaConceptual.js";
import {
  TipoImpacto,
  ETIQUETAS_TIPO_IMPACTO,
} from "../../enums/TipoImpacto.js";
import { ImpactoEsperado } from "../../models/ImpactoEsperado.js";
import { PoblacionValidator } from "../../validators/PoblacionValidator.js";
import { Alerta } from "../shared/Alerta.js";

export class Seccion4ImpactosView {
  public render(
    nota: NotaConceptual,
    soloLectura: boolean
  ): HTMLElement {
    const seccion = document.createElement("section");
    seccion.className = "seccion-form card";
    seccion.innerHTML =
      `<h3 class="seccion-titulo">4. Impactos esperados</h3>`;

    if (nota.impactosEsperados.length === 0) {
      Object.values(TipoImpacto).forEach((tipo) =>
        nota.impactosEsperados.push(
          new ImpactoEsperado(tipo)
        )
      );
    }

    const tabla = document.createElement("table");
    tabla.className = "tabla-elegante";
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Tipo de impacto</th>
          <th>Descripción base (Anexo 1)</th>
          <th>Elaboración específica</th>
        </tr>
      </thead>
    `;

    const tbody = document.createElement("tbody");

    nota.impactosEsperados.forEach((impacto) => {
      const tr = document.createElement("tr");

      const tdTipo = document.createElement("td");
      tdTipo.textContent =
        ETIQUETAS_TIPO_IMPACTO[impacto.tipo];

      const tdBase = document.createElement("td");
      tdBase.className = "texto-descripcion-base";
      tdBase.textContent = impacto.obtenerDescripcionBase();

      const tdInput = document.createElement("td");
      const textarea = document.createElement("textarea");

      textarea.value = impacto.descripcion;
      textarea.disabled = soloLectura;
      textarea.rows = 2;

      textarea.addEventListener("blur", () => {
        impacto.descripcion = textarea.value;
      });

      tdInput.appendChild(textarea);
      tr.append(tdTipo, tdBase, tdInput);
      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    seccion.appendChild(tabla);

    seccion.appendChild(
      this.renderPoblacion(nota, soloLectura)
    );

    return seccion;
  }

  private renderPoblacion(
    nota: NotaConceptual,
    soloLectura: boolean
  ): HTMLElement {
    const bloque = document.createElement("div");
    bloque.className = "subseccion";

    const h4 = document.createElement("h4");
    h4.textContent =
      "Identificación y caracterización de la población objetivo";

    bloque.appendChild(h4);

    const fila = document.createElement("div");
    fila.className = "fila-campos";

    const mensajeError = document.createElement("span");
    mensajeError.className = "mensaje-error";

    const crearCampo = (
      etiqueta: string,
      valor: number,
      onBlur: (valor: number) => void
    ): HTMLElement => {
      const campo = document.createElement("div");
      campo.className = "campo-formulario";

      const label = document.createElement("label");
      label.textContent = etiqueta;

      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.value = `${valor}`;
      input.disabled = soloLectura;

      input.addEventListener("blur", () => {
        onBlur(Number(input.value));

        const resultado =
          PoblacionValidator.validarJerarquia(
            nota.poblacionBeneficiaria
          );

        mensajeError.textContent = resultado.valido
          ? ""
          : resultado.mensaje ?? "";

        if (!resultado.valido) {
          Alerta.advertencia(
            resultado.mensaje ??
              "Jerarquía de población inválida."
          );
        }
      });

      campo.append(label, input);

      return campo;
    };

    fila.append(
      crearCampo(
        "Población de referencia",
        nota.poblacionBeneficiaria.poblacionReferencia,
        (v) =>
          (nota.poblacionBeneficiaria.poblacionReferencia = v)
      ),
      crearCampo(
        "Población potencial",
        nota.poblacionBeneficiaria.poblacionPotencial,
        (v) =>
          (nota.poblacionBeneficiaria.poblacionPotencial = v)
      ),
      crearCampo(
        "Población objetivo (beneficiario directo)",
        nota.poblacionBeneficiaria.poblacionObjetivo,
        (v) =>
          (nota.poblacionBeneficiaria.poblacionObjetivo = v)
      )
    );

    bloque.append(fila, mensajeError);

    return bloque;
  }
}
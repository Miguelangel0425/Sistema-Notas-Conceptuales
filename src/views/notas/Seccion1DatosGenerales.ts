import { NotaConceptual } from "../../models/NotaConceptual.js";
import { Cobertura, ETIQUETAS_COBERTURA } from "../../enums/Cobertura.js";
import { SectorBeneficiario, ETIQUETAS_SECTOR_BENEFICIARIO } from "../../enums/SectorBeneficiario.js";

export class Seccion1DatosGeneralesView {
    public render(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
        const seccion = document.createElement("section");
        seccion.className = "seccion-form card";
        seccion.innerHTML = `<h3 class="seccion-titulo">1. Datos generales</h3>`;

        const grupoCobertura = document.createElement("div");
        grupoCobertura.className = "campo-formulario";
        const labelCobertura = document.createElement("label");
        labelCobertura.textContent = "Cobertura";
        grupoCobertura.appendChild(labelCobertura);

        const checkboxesCobertura = document.createElement("div");
        checkboxesCobertura.className = "grupo-checkbox";
        Object.values(Cobertura).forEach((valor) => {
            const label = document.createElement("label");
            label.className = "checkbox-item";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = nota.cobertura.includes(valor);
            input.disabled = soloLectura;
            input.addEventListener("change", () => {
                if (input.checked) {
                    if (!nota.cobertura.includes(valor)) nota.cobertura.push(valor);
                } else {
                    nota.cobertura = nota.cobertura.filter((c) => c !== valor);
                }
            });
            label.append(input, document.createTextNode(" " + ETIQUETAS_COBERTURA[valor]));
            checkboxesCobertura.appendChild(label);
        });
        grupoCobertura.appendChild(checkboxesCobertura);

        const grupoLocalizacion = document.createElement("div");
        grupoLocalizacion.className = "fila-campos";
        (["provincia", "canton", "parroquia", "barrioComunidad"] as const).forEach((campo) => {
            const contenedorCampo = document.createElement("div");
            contenedorCampo.className = "campo-formulario";
            const label = document.createElement("label");
            const etiquetas: Record<string, string> = {
                provincia: "Provincia",
                canton: "Cantón",
                parroquia: "Parroquia",
                barrioComunidad: "Barrio o comunidad",
            };
            label.textContent = etiquetas[campo];
            const input = document.createElement("input");
            input.type = "text";
            input.value = nota.localizacion[campo];
            input.disabled = soloLectura;
            input.addEventListener("blur", () => {
                nota.localizacion = { ...nota.localizacion, [campo]: input.value };
            });
            contenedorCampo.append(label, input);
            grupoLocalizacion.appendChild(contenedorCampo);
        });

        const grupoSector = document.createElement("div");
        grupoSector.className = "campo-formulario";
        const labelSector = document.createElement("label");
        labelSector.textContent = "Sector de población beneficiaria";
        grupoSector.appendChild(labelSector);
        const checkboxesSector = document.createElement("div");
        checkboxesSector.className = "grupo-checkbox";
        Object.values(SectorBeneficiario).forEach((valor) => {
            const label = document.createElement("label");
            label.className = "checkbox-item";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = nota.sectorBeneficiario.includes(valor);
            input.disabled = soloLectura;
            input.addEventListener("change", () => {
                if (input.checked) {
                    if (!nota.sectorBeneficiario.includes(valor)) nota.sectorBeneficiario.push(valor);
                } else {
                    nota.sectorBeneficiario = nota.sectorBeneficiario.filter((s) => s !== valor);
                }
            });
            label.append(input, document.createTextNode(" " + ETIQUETAS_SECTOR_BENEFICIARIO[valor]));
            checkboxesSector.appendChild(label);
        });
        grupoSector.appendChild(checkboxesSector);

        seccion.append(grupoCobertura, grupoLocalizacion, grupoSector);
        return seccion;
    }
}

import { IView } from "../../interfaces/IView.js";
import { ConvocatoriaService } from "../../services/ConvocatoriaService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class ConvocatoriaFormView implements IView {
  private servicio = new ConvocatoriaService();

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-formulario";

    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Nueva convocatoria";

    const card = document.createElement("div");
    card.className = "card";

    const form = document.createElement("form");
    form.className = "formulario";
    form.innerHTML = `
      <div class="campo-formulario">
        <label for="nombre">Nombre de la convocatoria <span class="obligatorio">*</span></label>
        <input type="text" id="nombre" name="nombre" placeholder="Ej. Convocatoria Notas Conceptuales 2026" />
        <span class="mensaje-error" data-error-de="nombre"></span>
      </div>
      <div class="fila-campos">
        <div class="campo-formulario">
          <label for="fechaInicio">Fecha de inicio <span class="obligatorio">*</span></label>
          <input type="date" id="fechaInicio" name="fechaInicio" />
          <span class="mensaje-error" data-error-de="fechaInicio"></span>
        </div>
        <div class="campo-formulario">
          <label for="fechaFin">Fecha de fin <span class="obligatorio">*</span></label>
          <input type="date" id="fechaFin" name="fechaFin" />
          <span class="mensaje-error" data-error-de="fechaFin"></span>
        </div>
      </div>
      <div class="acciones-formulario">
        <button type="button" class="btn btn-secundario" id="btnCancelar">Cancelar</button>
        <button type="submit" class="btn btn-primario">Guardar convocatoria</button>
      </div>
    `;

    form.querySelector<HTMLButtonElement>("#btnCancelar")!.addEventListener("click", () => {
      Router.obtenerInstancia().navegar("#/convocatorias");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.limpiarErrores(form);

      const nombre = form.querySelector<HTMLInputElement>("#nombre")!.value.trim();
      const fechaInicioStr = form.querySelector<HTMLInputElement>("#fechaInicio")!.value;
      const fechaFinStr = form.querySelector<HTMLInputElement>("#fechaFin")!.value;

      if (!fechaInicioStr || !fechaFinStr) {
        Alerta.advertencia("Debe completar ambas fechas.");
        return;
      }

      const resultado = this.servicio.crear(
        nombre,
        FormatUtils.desdeFechaInput(fechaInicioStr),
        FormatUtils.desdeFechaInput(fechaFinStr)
      );

      if (!resultado.valido) {
        this.mostrarError(form, resultado.mensaje ?? "Datos inválidos.");
        Alerta.error(resultado.mensaje ?? "No se pudo guardar la convocatoria.");
        return;
      }

      Alerta.exito("Convocatoria registrada correctamente.");
      Router.obtenerInstancia().navegar("#/convocatorias");
    });

    card.appendChild(form);
    contenedor.append(titulo, card);
    return contenedor;
  }

  private limpiarErrores(form: HTMLFormElement): void {
    form.querySelectorAll<HTMLElement>(".mensaje-error").forEach((e) => (e.textContent = ""));
    form.querySelectorAll<HTMLElement>(".campo-invalido").forEach((e) => e.classList.remove("campo-invalido"));
  }

  private mostrarError(form: HTMLFormElement, mensaje: string): void {
    const campoNombre = form.querySelector<HTMLElement>('[data-error-de="nombre"]');
    if (campoNombre) campoNombre.textContent = mensaje;
  }
}

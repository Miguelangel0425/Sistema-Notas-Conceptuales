import { IView } from "../../interfaces/IView.js";
import { DirectorService } from "../../services/DirectorService.js";
import { DomUtils } from "../../utils/DomUtils.js";
import { DEPARTAMENTOS } from "../../data/departamentos.data.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class DirectorFormView implements IView {
  private servicio = new DirectorService();

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-formulario";

    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Nuevo director";

    const card = document.createElement("div");
    card.className = "card";

    const form = document.createElement("form");
    form.className = "formulario";
    form.innerHTML = `
      <div class="fila-campos">
        <div class="campo-formulario">
          <label for="nombres">Nombres <span class="obligatorio">*</span></label>
          <input type="text" id="nombres" />
        </div>
        <div class="campo-formulario">
          <label for="apellidos">Apellidos <span class="obligatorio">*</span></label>
          <input type="text" id="apellidos" />
        </div>
      </div>
      <div class="fila-campos">
        <div class="campo-formulario">
          <label for="correo">Correo institucional <span class="obligatorio">*</span></label>
          <input type="email" id="correo" placeholder="nombre@espe.edu.ec" />
        </div>
        <div class="campo-formulario">
          <label for="telefono">Teléfono <span class="obligatorio">*</span></label>
          <input type="tel" id="telefono" placeholder="0999999999" />
        </div>
      </div>
      <div class="campo-formulario">
        <label for="departamento">Departamento <span class="obligatorio">*</span></label>
        <select id="departamento"></select>
      </div>
      <div class="acciones-formulario">
        <button type="button" class="btn btn-secundario" id="btnCancelar">Cancelar</button>
        <button type="submit" class="btn btn-primario">Guardar director</button>
      </div>
    `;

    const selectDepartamento = form.querySelector<HTMLSelectElement>("#departamento")!;
    DomUtils.poblarSelect(selectDepartamento, DEPARTAMENTOS, "Seleccione un elemento");

    form.querySelector<HTMLButtonElement>("#btnCancelar")!.addEventListener("click", () => {
      Router.obtenerInstancia().navegar("#/directores");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombres = form.querySelector<HTMLInputElement>("#nombres")!.value.trim();
      const apellidos = form.querySelector<HTMLInputElement>("#apellidos")!.value.trim();
      const correo = form.querySelector<HTMLInputElement>("#correo")!.value.trim();
      const telefono = form.querySelector<HTMLInputElement>("#telefono")!.value.trim();
      const departamento = selectDepartamento.value;

      if (!departamento) {
        Alerta.advertencia("Debe seleccionar un departamento.");
        return;
      }

      const resultado = this.servicio.crear(nombres, apellidos, correo, telefono, departamento);
      if (!resultado.valido) {
        Alerta.error(resultado.mensaje ?? "Datos inválidos.");
        return;
      }
      Alerta.exito("Director registrado correctamente.");
      Router.obtenerInstancia().navegar("#/directores");
    });

    card.appendChild(form);
    contenedor.append(titulo, card);
    return contenedor;
  }
}

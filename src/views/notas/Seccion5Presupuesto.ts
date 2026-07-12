import { NotaConceptual } from "../../models/NotaConceptual.js";
import { ItemPresupuesto } from "../../models/ItemPresupuesto.js";
import { PresupuestoService } from "../../services/PresupuestoService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { TablaDinamica } from "../shared/TablaDinamica.js";
import { Alerta } from "../shared/Alerta.js";

export class Seccion5PresupuestoView {
  private servicio = new PresupuestoService();

  public render(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
    const seccion = document.createElement("section");
    seccion.className = "seccion-form card";
    seccion.innerHTML = `<h3 class="seccion-titulo">5. Financiamiento y presupuesto</h3>`;

    const total = nota.presupuesto.calcularTotal();
    const badgeTotal = document.createElement("div");
    badgeTotal.className = `badge-total ${total > 20000 ? "badge-total-excedido" : ""}`;
    badgeTotal.textContent = `TOTAL: ${FormatUtils.formatearMoneda(total)} / Límite: ${FormatUtils.formatearMoneda(20000)}`;
    seccion.appendChild(badgeTotal);

    seccion.appendChild(
      TablaDinamica.render({
        columnas: [
          { titulo: "Nro. ítem", render: (i: ItemPresupuesto) => i.nroItem },
          { titulo: "Descripción", render: (i: ItemPresupuesto) => i.descripcionItem },
          { titulo: "Bien o servicio", render: (i: ItemPresupuesto) => i.nombreBienServicio },
          { titulo: "Cantidad", render: (i: ItemPresupuesto) => `${i.cantidad}` },
          { titulo: "V. unitario", render: (i: ItemPresupuesto) => FormatUtils.formatearMoneda(i.valorUnitario) },
          { titulo: "Total", render: (i: ItemPresupuesto) => FormatUtils.formatearMoneda(i.calcularSubtotal()) },
        ],
        filas: nota.presupuesto.items,
        onEliminar:
          soloLectura
            ? undefined
            : (item) => {
                const r = this.servicio.eliminarItem(nota, item.id);
                if (r.valido) alCambiar();
                else Alerta.error(r.mensaje ?? "No se pudo eliminar el ítem.");
              },
        filaTotales: ["TOTAL $", "", "", "", "", FormatUtils.formatearMoneda(total)],
        mensajeVacio: "No hay ítems presupuestarios agregados todavía.",
      })
    );

    if (!soloLectura) seccion.appendChild(this.formularioAgregarItem(nota, alCambiar));
    seccion.appendChild(this.renderEntidadCooperante(nota, soloLectura, alCambiar));
    return seccion;
  }

  private formularioAgregarItem(nota: NotaConceptual, alCambiar: () => void): HTMLElement {
    const form = document.createElement("form");
    form.className = "formulario-inline";
    form.innerHTML = `
      <input type="text" id="nroItem" placeholder="Nro. ítem" style="width:80px" />
      <input type="text" id="descItem" placeholder="Descripción del ítem" />
      <input type="text" id="bienServicio" placeholder="Bien o servicio" />
      <input type="number" id="cantidadItem" placeholder="Cantidad" min="1" style="width:100px" />
      <input type="number" id="valorItem" placeholder="V. unitario" min="0" step="0.01" style="width:120px" />
      <button type="submit" class="btn btn-secundario">+ Agregar ítem</button>
    `;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nroItem = form.querySelector<HTMLInputElement>("#nroItem")!.value.trim();
      const descItem = form.querySelector<HTMLInputElement>("#descItem")!.value.trim();
      const bienServicio = form.querySelector<HTMLInputElement>("#bienServicio")!.value.trim();
      const cantidad = Number(form.querySelector<HTMLInputElement>("#cantidadItem")!.value);
      const valorUnitario = Number(form.querySelector<HTMLInputElement>("#valorItem")!.value);

      const resultado = this.servicio.agregarItem(nota, nroItem, descItem, bienServicio, cantidad, valorUnitario);
      if (!resultado.valido) {
        Alerta.error(resultado.mensaje ?? "No se pudo agregar el ítem.");
        return;
      }
      alCambiar();
    });
    return form;
  }

  private renderEntidadCooperante(nota: NotaConceptual, soloLectura: boolean, alCambiar: () => void): HTMLElement {
    const bloque = document.createElement("div");
    bloque.className = "subseccion";
    const h4 = document.createElement("h4");
    h4.textContent = "5.2 Presupuesto de entidad auspiciante / cooperante";
    bloque.appendChild(h4);

    if (!nota.presupuesto.entidadCooperante) {
      if (!soloLectura) {
        const form = document.createElement("form");
        form.className = "formulario-inline";
        form.innerHTML = `<input type="text" id="nombreEntidad" placeholder="Nombre de la entidad cooperante" /><button type="submit" class="btn btn-secundario">+ Asignar entidad</button>`;
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const nombre = form.querySelector<HTMLInputElement>("#nombreEntidad")!.value.trim();
          if (!nombre) {
            Alerta.advertencia("Ingrese el nombre de la entidad cooperante.");
            return;
          }
          this.servicio.asignarEntidadCooperante(nota, nombre);
          alCambiar();
        });
        bloque.appendChild(form);
      } else {
        const p = document.createElement("p");
        p.className = "tabla-vacia";
        p.textContent = "No se registró entidad cooperante.";
        bloque.appendChild(p);
      }
      return bloque;
    }

    const entidad = nota.presupuesto.entidadCooperante;
    const nombreEntidad = document.createElement("p");
    nombreEntidad.innerHTML = `<strong>Entidad:</strong> ${entidad.nombre}`;
    bloque.appendChild(nombreEntidad);

    bloque.appendChild(
      TablaDinamica.render({
        columnas: [
          { titulo: "Detalle", render: (i: ItemPresupuesto) => i.descripcionItem },
          { titulo: "Cantidad", render: (i: ItemPresupuesto) => `${i.cantidad}` },
          { titulo: "V.U. $", render: (i: ItemPresupuesto) => FormatUtils.formatearMoneda(i.valorUnitario) },
          { titulo: "V. Total $", render: (i: ItemPresupuesto) => FormatUtils.formatearMoneda(i.calcularSubtotal()) },
        ],
        filas: entidad.items,
        onEliminar: soloLectura
          ? undefined
          : (item) => {
              entidad.eliminarItem(item.id);
              alCambiar();
            },
        filaTotales: ["Total $", "", "", FormatUtils.formatearMoneda(entidad.calcularTotalAporte())],
        mensajeVacio: "La entidad cooperante no tiene ítems registrados.",
      })
    );

    if (!soloLectura) {
      const form = document.createElement("form");
      form.className = "formulario-inline";
      form.innerHTML = `
        <input type="text" id="detalleEnt" placeholder="Detalle bien/servicio" />
        <input type="number" id="cantidadEnt" placeholder="Cantidad" min="1" style="width:100px" />
        <input type="number" id="valorEnt" placeholder="V. unitario" min="0" step="0.01" style="width:120px" />
        <button type="submit" class="btn btn-secundario">+ Agregar</button>
      `;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const detalle = form.querySelector<HTMLInputElement>("#detalleEnt")!.value.trim();
        const cantidad = Number(form.querySelector<HTMLInputElement>("#cantidadEnt")!.value);
        const valorUnitario = Number(form.querySelector<HTMLInputElement>("#valorEnt")!.value);
        const resultado = this.servicio.agregarItemEntidadCooperante(entidad, detalle, cantidad, valorUnitario);
        if (!resultado.valido) {
          Alerta.error(resultado.mensaje ?? "No se pudo agregar el ítem.");
          return;
        }
        alCambiar();
      });
      bloque.appendChild(form);
    }

    return bloque;
  }
}

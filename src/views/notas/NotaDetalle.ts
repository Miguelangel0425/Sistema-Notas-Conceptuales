import { IView } from "../../interfaces/IView.js";
import { NotaConceptualService } from "../../services/NotaConceptualService.js";
import { NotaConceptual } from "../../models/NotaConceptual.js";
import { EstadoNota, etiquetaEstadoNota } from "../../enums/EstadoNota.js";
import { Seccion1DatosGeneralesView } from "./Seccion1DatosGenerales.js";
import { Seccion2AlineamientoView } from "./Seccion2Alineamiento.js";
import { Seccion3DeptosCarrerasView } from "./Seccion3DeptosCarreras.js";
import { Seccion4ImpactosView } from "./Seccion4Impactos.js";
import { Seccion5PresupuestoView } from "./Seccion5Presupuesto.js";
import { Seccion6CronogramaView } from "./Seccion6Cronograma.js";
import { Alerta } from "../shared/Alerta.js";
import { Router } from "../../controllers/Router.js";

export class NotaDetalleView implements IView {
  private servicio = new NotaConceptualService();
  private raiz: HTMLElement = document.createElement("div");

  constructor(private notaId: string) {}

  public render(): HTMLElement {
    this.pintar();
    return this.raiz;
  }

  private pintar(): void {
    const nota = this.servicio.obtenerPorId(this.notaId);
    this.raiz.innerHTML = "";
    this.raiz.className = "vista vista-detalle-nota";

    if (!nota) {
      const aviso = document.createElement("p");
      aviso.className = "tabla-vacia";
      aviso.textContent = "Nota conceptual no encontrada.";
      this.raiz.appendChild(aviso);
      return;
    }

    const soloLectura = !nota.esEditable();
    const alCambiar = () => this.pintar();

    this.raiz.appendChild(this.renderEncabezado(nota, soloLectura));
    this.raiz.appendChild(new Seccion1DatosGeneralesView().render(nota, soloLectura));
    this.raiz.appendChild(new Seccion2AlineamientoView().render(nota, soloLectura, alCambiar));
    this.raiz.appendChild(new Seccion3DeptosCarrerasView().render(nota, soloLectura, alCambiar));
    this.raiz.appendChild(new Seccion4ImpactosView().render(nota, soloLectura));
    this.raiz.appendChild(new Seccion5PresupuestoView().render(nota, soloLectura, alCambiar));
    this.raiz.appendChild(new Seccion6CronogramaView().render(nota, soloLectura, alCambiar));

    if (!soloLectura) {
      this.raiz.appendChild(this.renderBotonRegistro(nota));
    }
  }

  /** Botón final: valida integralmente el formulario y confirma el registro de la nota. */
  private renderBotonRegistro(nota: NotaConceptual): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "card acciones-registro";

    const btnRegistrar = document.createElement("button");
    btnRegistrar.type = "button";
    btnRegistrar.className = "btn btn-primario btn-registrar";
    btnRegistrar.textContent = "✔ Registrar nota conceptual";
    btnRegistrar.addEventListener("click", () => {
      const resultado = this.servicio.validarFormularioCompleto(nota);
      if (!resultado.valido) {
        Alerta.error(resultado.mensaje ?? "El formulario tiene datos incompletos o inválidos.");
        return;
      }
      Alerta.exito(`Nota conceptual ${nota.codigo} registrada correctamente con todos sus datos.`);
    });

    contenedor.appendChild(btnRegistrar);
    return contenedor;
  }

  private renderEncabezado(nota: NotaConceptual, soloLectura: boolean): HTMLElement {
    const encabezado = document.createElement("div");
    encabezado.className = "vista-encabezado vista-encabezado-detalle";

    const grupoTitulo = document.createElement("div");
    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = `${nota.codigo} — ${nota.nombre}`;
    const badge = document.createElement("span");
    badge.className = `badge badge-${nota.estado.toLowerCase()}`;
    badge.textContent = etiquetaEstadoNota(nota.estado);
    grupoTitulo.append(titulo, badge);

    const acciones = document.createElement("div");
    acciones.className = "acciones-encabezado";

    const btnVolver = document.createElement("button");
    btnVolver.className = "btn btn-secundario";
    btnVolver.textContent = "← Volver al listado";
    btnVolver.addEventListener("click", () => Router.obtenerInstancia().navegar("#/notas"));
    acciones.appendChild(btnVolver);

    if (soloLectura) {
      const aviso = document.createElement("span");
      aviso.className = "aviso-solo-lectura";
      aviso.textContent = "Esta nota no es editable en su estado actual.";
      acciones.appendChild(aviso);
    } else {
      const selectEstado = document.createElement("select");
      selectEstado.className = "select-estado";
      Object.values(EstadoNota).forEach((estado) => {
        const opt = document.createElement("option");
        opt.value = estado;
        opt.textContent = etiquetaEstadoNota(estado);
        opt.selected = estado === nota.estado;
        selectEstado.appendChild(opt);
      });
      selectEstado.addEventListener("change", () => {
        const resultado = this.servicio.cambiarEstado(nota.id, selectEstado.value as EstadoNota);
        if (resultado.valido) {
          Alerta.exito("Estado actualizado correctamente.");
          this.pintar();
        } else {
          Alerta.error(resultado.mensaje ?? "No se pudo cambiar el estado.");
        }
      });
      acciones.appendChild(selectEstado);
    }

    encabezado.append(grupoTitulo, acciones);
    return encabezado;
  }
}

import { IView } from "../../interfaces/IView.js";
import { EstadisticasService } from "../../services/EstadisticasService.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { EventBus } from "../../classes/EventBus.js";

interface ITarjeta {
  etiqueta: string;
  valor: string;
  icono: string;
  clase: string;
}

export class DashboardView implements IView {
  private servicio = new EstadisticasService();
  private eventBus = EventBus.obtenerInstancia();
  private eventos = [
    "nota:creada",
    "nota:eliminada",
    "nota:estadoCambiado",
    "convocatoria:creada",
    "convocatoria:eliminada",
    "director:creado",
    "director:eliminado",
    "presupuesto:recalculado",
  ];
  private handler = () => this.actualizar();
  private contenedorTarjetas: HTMLElement | null = null;

  public render(): HTMLElement {
    const contenedor = document.createElement("div");
    contenedor.className = "vista vista-dashboard";

    const titulo = document.createElement("h2");
    titulo.className = "vista-titulo";
    titulo.textContent = "Dashboard institucional";

    this.contenedorTarjetas = document.createElement("div");
    this.contenedorTarjetas.className = "grid-tarjetas";
    this.pintarTarjetas();

    contenedor.append(titulo, this.contenedorTarjetas);

    this.eventos.forEach((ev) => this.eventBus.on(ev, this.handler));
    return contenedor;
  }

  private actualizar(): void {
    this.pintarTarjetas();
  }

  private pintarTarjetas(): void {
    if (!this.contenedorTarjetas) return;
    this.contenedorTarjetas.innerHTML = "";
    const stats = this.servicio.obtener();

    const tarjetas: ITarjeta[] = [
      { etiqueta: "Convocatorias", valor: `${stats.numeroConvocatorias}`, icono: "📢", clase: "tarjeta-azul" },
      { etiqueta: "Notas conceptuales", valor: `${stats.numeroNotas}`, icono: "📝", clase: "tarjeta-morado" },
      { etiqueta: "Directores", valor: `${stats.numeroDirectores}`, icono: "👤", clase: "tarjeta-verde" },
      { etiqueta: "Presupuesto total", valor: FormatUtils.formatearMoneda(stats.presupuestoTotal), icono: "💰", clase: "tarjeta-dorado" },
      { etiqueta: "Notas aprobadas", valor: `${stats.notasAprobadas}`, icono: "✅", clase: "tarjeta-verde" },
      { etiqueta: "Notas rechazadas", valor: `${stats.notasRechazadas}`, icono: "❌", clase: "tarjeta-rojo" },
      { etiqueta: "Notas en revisión", valor: `${stats.notasEnRevision}`, icono: "🔄", clase: "tarjeta-naranja" },
      { etiqueta: "Notas registradas", valor: `${stats.notasRegistradas}`, icono: "📥", clase: "tarjeta-azul" },
    ];

    tarjetas.forEach((t) => {
      const card = document.createElement("div");
      card.className = `tarjeta ${t.clase}`;
      card.innerHTML = `
        <div class="tarjeta-icono">${t.icono}</div>
        <div class="tarjeta-cuerpo">
          <span class="tarjeta-valor"></span>
          <span class="tarjeta-etiqueta"></span>
        </div>`;
      card.querySelector(".tarjeta-valor")!.textContent = t.valor;
      card.querySelector(".tarjeta-etiqueta")!.textContent = t.etiqueta;
      this.contenedorTarjetas!.appendChild(card);
    });
  }

  public destroy(): void {
    this.eventos.forEach((ev) => this.eventBus.off(ev, this.handler));
  }
}

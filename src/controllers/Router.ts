import { IView } from "../interfaces/IView.js";

type RutaHandler = (params: Record<string, string>) => IView;

export class Router {
  private static instancia: Router;
  private rutas: { patron: RegExp; nombres: string[]; handler: RutaHandler }[] = [];
  private contenedor: HTMLElement;
  private vistaActual: IView | null = null;
  private rutaPorDefecto = "#/dashboard";

  private constructor(contenedor: HTMLElement) {
    this.contenedor = contenedor;
    window.addEventListener("hashchange", () => this.resolver());
  }

  public static inicializar(contenedor: HTMLElement): Router {
    if (!Router.instancia) {
      Router.instancia = new Router(contenedor);
    }
    return Router.instancia;
  }

  public static obtenerInstancia(): Router {
    return Router.instancia;
  }

  public registrar(ruta: string, handler: RutaHandler): void {
    const nombres: string[] = [];
    const patronStr = ruta
      .split("/")
      .map((segmento) => {
        if (segmento.startsWith(":")) {
          nombres.push(segmento.substring(1));
          return "([^/]+)";
        }
        return segmento.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("/");
    this.rutas.push({ patron: new RegExp(`^${patronStr}$`), nombres, handler });
  }

  public navegar(ruta: string): void {
    window.location.hash = ruta;
  }

  public iniciar(): void {
    if (!window.location.hash) {
      window.location.hash = this.rutaPorDefecto;
    } else {
      this.resolver();
    }
  }

  private resolver(): void {
    const hash = window.location.hash || this.rutaPorDefecto;
    for (const ruta of this.rutas) {
      const match = hash.match(ruta.patron);
      if (match) {
        const params: Record<string, string> = {};
        ruta.nombres.forEach((nombre, i) => (params[nombre] = match[i + 1]));
        this.renderizar(ruta.handler(params));
        this.marcarEnlaceActivo(hash);
        return;
      }
    }
    window.location.hash = this.rutaPorDefecto;
  }

  private renderizar(vista: IView): void {
    if (this.vistaActual?.destroy) this.vistaActual.destroy();
    this.contenedor.innerHTML = "";
    this.contenedor.appendChild(vista.render());
    this.vistaActual = vista;
  }

  private marcarEnlaceActivo(hash: string): void {
    document.querySelectorAll<HTMLAnchorElement>(".sidebar-link").forEach((a) => {
      a.classList.toggle("activo", a.getAttribute("href") === hash);
    });
  }
}

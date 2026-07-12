import { SistemaGestion, IEstadisticasDashboard } from "../models/SistemaGestion.js";

export class EstadisticasService {
  private sistema = SistemaGestion.obtenerInstancia();

  public obtener(): IEstadisticasDashboard {
    return this.sistema.obtenerEstadisticas();
  }
}

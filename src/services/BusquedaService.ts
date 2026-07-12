import { SistemaGestion } from "../models/SistemaGestion.js";
import { NotaConceptual } from "../models/NotaConceptual.js";
import { EstadoNota } from "../enums/EstadoNota.js";

export class BusquedaService {
  private sistema = SistemaGestion.obtenerInstancia();

  public porCodigo(codigo: string): NotaConceptual | null {
    return this.sistema.buscarPorCodigo(codigo.trim());
  }

  public porDirector(nombreDirector: string): NotaConceptual[] {
    const t = nombreDirector.trim().toLowerCase();
    return this.sistema.notasConceptuales.filter((n) => n.director.obtenerNombreCompleto().toLowerCase().includes(t));
  }

  public porNombre(nombre: string): NotaConceptual[] {
    const t = nombre.trim().toLowerCase();
    return this.sistema.notasConceptuales.filter((n) => n.nombre.toLowerCase().includes(t));
  }

  public porEstado(estado: EstadoNota): NotaConceptual[] {
    return this.sistema.notasConceptuales.filter((n) => n.estado === estado);
  }

  public porConvocatoria(convocatoriaId: string): NotaConceptual[] {
    return this.sistema.notasConceptuales.filter((n) => n.convocatoriaId === convocatoriaId);
  }
}

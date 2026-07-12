import { Router } from "./Router.js";
import { NotaListaView } from "../views/notas/NotaLista.js";
import { NotaCrearView } from "../views/notas/NotaCrear.js";
import { NotaDetalleView } from "../views/notas/NotaDetalle.js";

export class NotaConceptualController {
  public registrarRutas(router: Router): void {
    router.registrar("#/notas", () => new NotaListaView());
    router.registrar("#/notas/nueva", () => new NotaCrearView());
    router.registrar("#/notas/:id", (params) => new NotaDetalleView(params.id));
  }
}

import { Router } from "./Router.js";
import { ConsultasView } from "../views/consultas/Consultas.js";

export class ConsultaController {
  public registrarRutas(router: Router): void {
    router.registrar("#/consultas", () => new ConsultasView());
  }
}

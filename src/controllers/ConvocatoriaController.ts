import { Router } from "./Router.js";
import { ConvocatoriaListaView } from "../views/convocatorias/ConvocatoriaLista.js";
import { ConvocatoriaFormView } from "../views/convocatorias/ConvocatoriaForm.js";

export class ConvocatoriaController {
  public registrarRutas(router: Router): void {
    router.registrar("#/convocatorias", () => new ConvocatoriaListaView());
    router.registrar("#/convocatorias/nueva", () => new ConvocatoriaFormView());
  }
}

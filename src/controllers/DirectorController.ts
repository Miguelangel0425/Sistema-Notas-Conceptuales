import { Router } from "./Router.js";
import { DirectorListaView } from "../views/directores/DirectorLista.js";
import { DirectorFormView } from "../views/directores/DirectorForm.js";

export class DirectorController {
  public registrarRutas(router: Router): void {
    router.registrar("#/directores", () => new DirectorListaView());
    router.registrar("#/directores/nuevo", () => new DirectorFormView());
  }
}

import { ShellView } from "./views/layout/Shell.js";
import { Router } from "./controllers/Router.js";
import { DashboardController } from "./controllers/DashboardController.js";
import { ConvocatoriaController } from "./controllers/ConvocatoriaController.js";
import { DirectorController } from "./controllers/DirectorController.js";
import { NotaConceptualController } from "./controllers/NotaConceptualController.js";
import { ConsultaController } from "./controllers/ConsultaController.js";
import { ReporteController } from "./controllers/ReporteController.js";
import { SeedService } from "./services/SeedService.js";

function iniciarAplicacion(): void {
  const raiz = document.getElementById("app");
  if (!raiz) {
    throw new Error('No se encontró el elemento raíz "#app" en index.html.');
  }

  SeedService.ejecutar();

  const appRoot = new ShellView().montar(raiz);
  const router = Router.inicializar(appRoot);

  new DashboardController().registrarRutas(router);
  new ConvocatoriaController().registrarRutas(router);
  new DirectorController().registrarRutas(router);
  new NotaConceptualController().registrarRutas(router);
  new ConsultaController().registrarRutas(router);
  new ReporteController().registrarRutas(router);

  router.iniciar();
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

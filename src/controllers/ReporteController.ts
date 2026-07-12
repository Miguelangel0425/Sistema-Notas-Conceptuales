import { Router } from "./Router.js";
import { ReportesView } from "../views/reportes/Reportes.js";

export class ReporteController {
    public registrarRutas(router: Router): void {
        router.registrar("#/reportes", () => new ReportesView());
    }
}

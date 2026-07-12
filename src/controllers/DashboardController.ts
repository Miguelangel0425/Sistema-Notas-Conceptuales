import { Router } from "./Router.js";
import { DashboardView } from "../views/dashboard/Dashboard.js";

export class DashboardController {
    public registrarRutas(router: Router): void {
        router.registrar("#/dashboard", () => new DashboardView());
    }
}

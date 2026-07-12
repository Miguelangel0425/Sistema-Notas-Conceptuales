export type TipoAlerta = "exito" | "error" | "advertencia" | "info";

export class Alerta {
    public static mostrar(mensaje: string, tipo: TipoAlerta = "info", duracionMs = 4000): void {
        const contenedor = Alerta.obtenerContenedor();
        const alerta = document.createElement("div");
        alerta.className = `alerta alerta-${tipo}`;
        alerta.innerHTML = `<span class="alerta-icono">${Alerta.icono(tipo)}</span><span class="alerta-texto"></span>`;
        alerta.querySelector(".alerta-texto")!.textContent = mensaje;
        contenedor.appendChild(alerta);
        requestAnimationFrame(() => alerta.classList.add("alerta-visible"));
        setTimeout(() => {
            alerta.classList.remove("alerta-visible");
            setTimeout(() => alerta.remove(), 300);
        }, duracionMs);
    }

    public static exito(mensaje: string): void {
        Alerta.mostrar(mensaje, "exito");
    }
    public static error(mensaje: string): void {
        Alerta.mostrar(mensaje, "error");
    }
    public static advertencia(mensaje: string): void {
        Alerta.mostrar(mensaje, "advertencia");
    }

    private static icono(tipo: TipoAlerta): string {
        const iconos: Record<TipoAlerta, string> = { exito: "✔", error: "✖", advertencia: "⚠", info: "ℹ" };
        return iconos[tipo];
    }

    private static obtenerContenedor(): HTMLElement {
        let contenedor = document.getElementById("alertas-contenedor");
        if (!contenedor) {
            contenedor = document.createElement("div");
            contenedor.id = "alertas-contenedor";
            document.body.appendChild(contenedor);
        }
        return contenedor;
    }
}
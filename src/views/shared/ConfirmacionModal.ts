import { Modal } from "./Modal.js";

export class ConfirmacionModal {
    public static confirmar(mensaje: string, alConfirmar: () => void, tituloBoton = "Eliminar"): void {
        const contenido = document.createElement("div");
        contenido.className = "confirmacion-contenido";

        const p = document.createElement("p");
        p.textContent = mensaje;

        const acciones = document.createElement("div");
        acciones.className = "confirmacion-acciones";

        const btnCancelar = document.createElement("button");
        btnCancelar.className = "btn btn-secundario";
        btnCancelar.textContent = "Cancelar";

        const btnConfirmar = document.createElement("button");
        btnConfirmar.className = "btn btn-peligro";
        btnConfirmar.textContent = tituloBoton;

        acciones.append(btnCancelar, btnConfirmar);
        contenido.append(p, acciones);

        const overlay = Modal.abrir("Confirmar acción", contenido);

        btnCancelar.addEventListener("click", () => Modal.cerrar(overlay));
        btnConfirmar.addEventListener("click", () => {
            Modal.cerrar(overlay);
            alConfirmar();
        });
    }
}

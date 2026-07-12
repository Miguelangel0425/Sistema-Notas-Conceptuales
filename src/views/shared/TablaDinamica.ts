export interface IColumnaTabla<T> {
    titulo: string;
    render: (fila: T) => string;
}

export interface ITablaDinamicaOpciones<T> {
    columnas: IColumnaTabla<T>[];
    filas: T[];
    onEliminar?: (fila: T) => void;
    filaTotales?: string[]; // celdas de la fila TOTALES, en el mismo orden que columnas
    mensajeVacio?: string;
}

/** Reutilizado por Departamentos, Carreras, Presupuesto, Presupuesto-cooperante y Cronograma. */
export class TablaDinamica {
    public static render<T>(opciones: ITablaDinamicaOpciones<T>): HTMLElement {
        const { columnas, filas, onEliminar, filaTotales, mensajeVacio } = opciones;
        const wrapper = document.createElement("div");
        wrapper.className = "tabla-dinamica-wrapper";

        if (filas.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "tabla-vacia";
            vacio.textContent = mensajeVacio ?? "No hay registros todavía.";
            wrapper.appendChild(vacio);
            return wrapper;
        }

        const tabla = document.createElement("table");
        tabla.className = "tabla-elegante";

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        columnas.forEach((c) => {
            const th = document.createElement("th");
            th.textContent = c.titulo;
            trHead.appendChild(th);
        });
        if (onEliminar) {
            const thAcciones = document.createElement("th");
            thAcciones.textContent = "Acciones";
            trHead.appendChild(thAcciones);
        }
        thead.appendChild(trHead);

        const tbody = document.createElement("tbody");
        filas.forEach((fila) => {
            const tr = document.createElement("tr");
            columnas.forEach((c) => {
                const td = document.createElement("td");
                td.textContent = c.render(fila);
                tr.appendChild(td);
            });
            if (onEliminar) {
                const td = document.createElement("td");
                const btn = document.createElement("button");
                btn.className = "btn btn-icono btn-peligro-outline";
                btn.textContent = "Eliminar";
                btn.addEventListener("click", () => onEliminar(fila));
                td.appendChild(btn);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });

        if (filaTotales) {
            const trTotales = document.createElement("tr");
            trTotales.className = "fila-totales";
            filaTotales.forEach((valor) => {
                const td = document.createElement("td");
                td.textContent = valor;
                trTotales.appendChild(td);
            });
            if (onEliminar) trTotales.appendChild(document.createElement("td"));
            tbody.appendChild(trTotales);
        }

        tabla.append(thead, tbody);
        wrapper.appendChild(tabla);
        return wrapper;
    }
}

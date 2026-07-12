import { IView } from "../../interfaces/IView.js";
import { BusquedaService } from "../../services/BusquedaService.js";
import { ConvocatoriaService } from "../../services/ConvocatoriaService.js";
import { NotaConceptual } from "../../models/NotaConceptual.js";
import { EstadoNota, etiquetaEstadoNota } from "../../enums/EstadoNota.js";
import { FormatUtils } from "../../utils/FormatUtils.js";
import { DomUtils } from "../../utils/DomUtils.js";
import { Router } from "../../controllers/Router.js";

export class ConsultasView implements IView {
    private busqueda = new BusquedaService();
    private servicioConvocatoria = new ConvocatoriaService();
    private resultados: HTMLElement = document.createElement("div");

    public render(): HTMLElement {
        const contenedor = document.createElement("div");
        contenedor.className = "vista vista-consultas";

        const titulo = document.createElement("h2");
        titulo.className = "vista-titulo";
        titulo.textContent = "Consultas";

        const card = document.createElement("div");
        card.className = "card";

        const tabs = document.createElement("div");
        tabs.className = "tabs-consulta";

        const panelCodigo = this.crearPanelBusquedaSimple("Buscar por código", "Ej. NC-2026-0001", (valor) => {
            const nota = this.busqueda.porCodigo(valor);
            this.pintarResultados(nota ? [nota] : []);
        });

        const panelDirector = this.crearPanelBusquedaSimple("Buscar por director", "Nombre del director", (valor) => {
            this.pintarResultados(this.busqueda.porDirector(valor));
        });

        const panelNombre = this.crearPanelBusquedaSimple("Buscar por nombre", "Nombre de la nota", (valor) => {
            this.pintarResultados(this.busqueda.porNombre(valor));
        });

        const panelEstado = this.crearPanelSelectEstado();
        const panelConvocatoria = this.crearPanelSelectConvocatoria();

        tabs.append(panelCodigo, panelDirector, panelNombre, panelEstado, panelConvocatoria);
        card.appendChild(tabs);

        this.resultados.className = "resultados-consulta";
        card.appendChild(this.resultados);

        contenedor.append(titulo, card);
        return contenedor;
    }

    private crearPanelBusquedaSimple(etiqueta: string, placeholder: string, alBuscar: (valor: string) => void): HTMLElement {
        const panel = document.createElement("form");
        panel.className = "panel-consulta";
        panel.innerHTML = `<label>${etiqueta}</label><div class="grupo-input-boton"><input type="text" placeholder="${placeholder}" /><button type="submit" class="btn btn-secundario">Buscar</button></div>`;
        panel.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = panel.querySelector<HTMLInputElement>("input")!;
            alBuscar(input.value.trim());
        });
        return panel;
    }

    private crearPanelSelectEstado(): HTMLElement {
        const panel = document.createElement("div");
        panel.className = "panel-consulta";
        const label = document.createElement("label");
        label.textContent = "Filtrar por estado";
        const select = document.createElement("select");
        Object.values(EstadoNota).forEach((estado) => {
            const opt = document.createElement("option");
            opt.value = estado;
            opt.textContent = etiquetaEstadoNota(estado);
            select.appendChild(opt);
        });
        select.addEventListener("change", () => {
            this.pintarResultados(this.busqueda.porEstado(select.value as EstadoNota));
        });
        panel.append(label, select);
        return panel;
    }

    private crearPanelSelectConvocatoria(): HTMLElement {
        const panel = document.createElement("div");
        panel.className = "panel-consulta";
        const label = document.createElement("label");
        label.textContent = "Filtrar por convocatoria";
        const select = document.createElement("select");
        const convocatorias = this.servicioConvocatoria.listar();
        DomUtils.poblarSelect(
            select,
            convocatorias.map((c) => c.nombre),
            "Seleccione una convocatoria"
        );
        select.addEventListener("change", () => {
            const conv = convocatorias.find((c) => c.nombre === select.value);
            if (conv) this.pintarResultados(this.busqueda.porConvocatoria(conv.id));
        });
        panel.append(label, select);
        return panel;
    }

    private pintarResultados(notas: NotaConceptual[]): void {
        this.resultados.innerHTML = "";
        if (notas.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "tabla-vacia";
            vacio.textContent = "No se encontraron resultados.";
            this.resultados.appendChild(vacio);
            return;
        }
        const tabla = document.createElement("table");
        tabla.className = "tabla-elegante";
        tabla.innerHTML = `<thead><tr><th>Código</th><th>Nombre</th><th>Director</th><th>Presupuesto</th><th>Estado</th><th></th></tr></thead>`;
        const tbody = document.createElement("tbody");
        notas.forEach((n) => {
            const tr = document.createElement("tr");
            [n.codigo, n.nombre, n.director.obtenerNombreCompleto(), FormatUtils.formatearMoneda(n.calcularPresupuestoTotal()), etiquetaEstadoNota(n.estado)].forEach((v) => {
                const td = document.createElement("td");
                td.textContent = v;
                tr.appendChild(td);
            });
            const tdAccion = document.createElement("td");
            const btn = document.createElement("button");
            btn.className = "btn btn-icono btn-secundario";
            btn.textContent = "Ver";
            btn.addEventListener("click", () => Router.obtenerInstancia().navegar(`#/notas/${n.id}`));
            tdAccion.appendChild(btn);
            tr.appendChild(tdAccion);
            tbody.appendChild(tr);
        });
        tabla.appendChild(tbody);
        this.resultados.appendChild(tabla);
    }
}

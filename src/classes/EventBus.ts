type Listener = (data?: unknown) => void;

/** Bus de eventos in-memory (Observer) para desacoplar Services de Views. */
export class EventBus {
    private static instancia: EventBus;
    private listeners: Map<string, Listener[]> = new Map();

    private constructor() { }

    public static obtenerInstancia(): EventBus {
        if (!EventBus.instancia) {
            EventBus.instancia = new EventBus();
        }
        return EventBus.instancia;
    }

    public on(evento: string, callback: Listener): void {
        if (!this.listeners.has(evento)) {
            this.listeners.set(evento, []);
        }
        this.listeners.get(evento)!.push(callback);
    }

    public off(evento: string, callback: Listener): void {
        const arr = this.listeners.get(evento);
        if (!arr) return;
        this.listeners.set(
            evento,
            arr.filter((cb) => cb !== callback)
        );
    }

    public emit(evento: string, data?: unknown): void {
        const arr = this.listeners.get(evento);
        if (!arr) return;
        arr.forEach((cb) => cb(data));
    }
}

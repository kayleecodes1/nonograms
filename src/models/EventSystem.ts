export class EventSystem<EventMap extends { [event: string]: (...args: any[]) => void }> {
    private _listeners: { [eventName in keyof EventMap]?: Set<Function> } = {};

    public on<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): void {
        if (!(event in this._listeners)) {
            this._listeners[event] = new Set();
        }
        this._listeners[event]?.add(listener);
    }

    public off<EventKey extends keyof EventMap = string>(event: EventKey, listener: EventMap[EventKey]): void {
        this._listeners[event]?.delete(listener);
    }

    public emit<EventKey extends keyof EventMap>(event: EventKey, ...args: Parameters<EventMap[EventKey]>): void {
        if (event in this._listeners) {
            for (const listener of this._listeners[event] || []) {
                listener(...args);
            }
        }
    }

    public clear(): void {
        this._listeners = {};
    }
}

export default EventSystem;

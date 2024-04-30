enum GameStateEvent {
    FILL = "fill",
    ERROR = "error",
    ROW_COMPLETE = "rowcomplete"
}

type FillEventCallback = (x: number, y: number) => void;
type ErrorEventCallback = (x: number, y: number) => void;
type RowCompleteCallback = (isHorizontal: boolean, coordinate: number) => void;

class GameStateEventSystem {
    private _handlers: {
        [GameStateEvent.FILL]: Set<FillEventCallback>,
        [GameStateEvent.ERROR]: Set<ErrorEventCallback>,
        [GameStateEvent.ROW_COMPLETE]: Set<RowCompleteCallback>
    } = {
        [GameStateEvent.FILL]: new Set(),
        [GameStateEvent.ERROR]: new Set(),
        [GameStateEvent.ROW_COMPLETE]: new Set(),
    };

    public on(event: GameStateEvent.FILL, callback: FillEventCallback): void;
    public on(event: GameStateEvent.ERROR, callback: ErrorEventCallback): void;
    public on(event: GameStateEvent.ROW_COMPLETE, callback: RowCompleteCallback): void;
    public on(event: GameStateEvent, callback: Function): void {
        this._handlers[event].add(callback as any);
    }

    public off(event: GameStateEvent.FILL, callback: FillEventCallback): void;
    public off(event: GameStateEvent.ERROR, callback: ErrorEventCallback): void;
    public off(event: GameStateEvent.ROW_COMPLETE, callback: RowCompleteCallback): void;
    public off(event: GameStateEvent, callback: Function): void {
        this._handlers[event].delete(callback as any);
    }
}

import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot {
    private readonly _uncommittedEvents: DomainEvent[] = [];
    private _version: number = 0;

    /**
     * The unique identifier of the aggregate.
     */
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    /**
     * Gets the list of uncommitted domain events.
     */
    public getUncommittedEvents(): DomainEvent[] {
        return this._uncommittedEvents;
    }

    /**
     * Clears the list of uncommitted domain events.
     */
    public clearUncommittedEvents(): void {
        this._uncommittedEvents.length = 0;
    }

    /**
     * Applies a domain event to the aggregate.
     * @param event The domain event to apply.
     */
    protected apply(event: DomainEvent): void {
        this._uncommittedEvents.push(event);
        this._version++;
        this.applyEvent(event);
    }

    /**
     * This method must be implemented by concrete subclasses to apply the domain event's changes to the aggregate's state.
     * @param event The domain event to apply.
     */
    protected abstract applyEvent(event: DomainEvent): void;

    /**
     * Gets the current version of the aggregate.
     */
    public getVersion(): number {
        return this._version;
    }
}
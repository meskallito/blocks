import { EventBus } from "./EventBus";
import { DomainEvent } from "../domain/DomainEvent";

export class InMemoryEventBus implements EventBus {
    private listeners: { [eventType: string]: ((event: DomainEvent) => void)[] } = {};

    publish(events: DomainEvent[]): void {
        events.forEach(event => {
            const eventType = event.eventType;
            const eventListeners = this.listeners[eventType] || [];
            eventListeners.forEach(listener => listener(event));
        });
    }

    subscribe<TEvent extends DomainEvent>(eventType: { new (...args: any[]): TEvent }, listener: (event: TEvent) => void): void {
        const eventTypeName = eventType.name;
        if (!this.listeners[eventTypeName]) {
            this.listeners[eventTypeName] = [];
        }
        this.listeners[eventTypeName].push(listener);
    }
}
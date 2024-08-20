import { EventStore } from "./EventStore";
import { DomainEvent } from "../domain/DomainEvent";

export class InMemoryEventStore implements EventStore {
    private events: { [key: string]: DomainEvent[] } = {};

    async saveEvents(aggregateId: string, events: DomainEvent[]): Promise<void> {
        if (!this.events[aggregateId]) {
            this.events[aggregateId] = [];
        }
        this.events[aggregateId].push(...events);
    }

    async getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]> {
        return this.events[aggregateId] || [];
    }
}
import { DomainEvent } from "../domain/DomainEvent";

export interface EventStore {
    saveEvents(aggregateId: string, events: DomainEvent[]): Promise<void>;
    getEventsForAggregate(aggregateId: string): Promise<DomainEvent[]>;
}
import { DomainEvent } from "../domain/DomainEvent";

export interface EventBus {
    publish(events: DomainEvent[]): void;
}
export interface DomainEvent {
    /**
     * The unique identifier of the aggregate that generated this event.
     */
    aggregateId: string;

    /**
     * The exact date and time when the event occurred.
     */
    occurredOn: Date;

    /**
     * A unique identifier for the event itself.
     */
    eventId: string;

    /**
     * The type of the event, typically the class name or a descriptive string.
     */
    eventType: string;
}
package events

import (
	"fmt"
)

type EventPublisher interface {
	Publish(events []DomainEvent) error
}

type InMemoryEventPublisher struct {
	PublishedEvents []DomainEvent
}

func (pb *InMemoryEventPublisher) Publish(events []DomainEvent) error {
	pb.PublishedEvents = append(pb.PublishedEvents, events...)
	for _, event := range events {
		switch e := event.(type) {
		case EmailUpdatedEvent:
			HandleEmailUpdatedEvent(e)
		case PhoneUpdatedEvent:
			HandlePhoneUpdatedEvent(e)
		default:
			return fmt.Errorf("unknown event type: %T", e)
		}
	}
	return nil
}

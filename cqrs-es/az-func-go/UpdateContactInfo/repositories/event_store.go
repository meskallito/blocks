package repositories

import "az-func-go/UpdateContactInfo/events"

type EventStore interface {
	Save(events []events.DomainEvent) error
}

type InMemoryEventStore struct {
	Events []events.DomainEvent
}

func (es *InMemoryEventStore) Save(events []events.DomainEvent) error {
	es.Events = append(es.Events, events...)
	return nil
}

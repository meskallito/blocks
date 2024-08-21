package handlers

import (
	"az-func-go/UpdateContactInfo/commands"
	"az-func-go/UpdateContactInfo/events"
	"az-func-go/UpdateContactInfo/model"
	"az-func-go/UpdateContactInfo/repositories"
	"testing"
)

func TestHandleUpdateContactInfoCommand(t *testing.T) {
	// Create a sample command
	command := commands.UpdateContactInfoCommand{
		Emails: []model.UpdateEmailItem{
			{Email: "email1@example.com", Category: "home"},
			{Email: "email2@example.com", Category: "work"},
		},
		PartyId: "samplePartyId",
		PhoneNumbers: []model.UpdatePhoneItem{
			{Phone: "1234567890", Category: "home"},
			{Phone: "0987654321", Category: "work"},
		},
	}

	eventStore := &repositories.InMemoryEventStore{}
	eventPublisher := &events.InMemoryEventPublisher{}
	// Call the handler
	err := HandleUpdateContactInfoCommand(command, eventStore, eventPublisher)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	// Assert that event store has the expected number of events
	if len(eventStore.Events) != 2 {
		t.Fatalf("expected 2 events, got %d", len(eventStore.Events))
	}
	// Assert that event publisher has the expected number of events
	if len(eventPublisher.PublishedEvents) != 2 {
		t.Fatalf("expected 2 published events, got %d", len(eventPublisher.PublishedEvents))
	}
}

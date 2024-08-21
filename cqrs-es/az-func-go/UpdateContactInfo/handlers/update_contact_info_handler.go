package handlers

import (
	"az-func-go/UpdateContactInfo/commands"
	"az-func-go/UpdateContactInfo/domain"
	"az-func-go/UpdateContactInfo/events"
	"az-func-go/UpdateContactInfo/repositories"
	"fmt"
)

func HandleUpdateContactInfoCommand(
	command commands.UpdateContactInfoCommand,
	eventStore repositories.EventStore,
	eventPublisher events.EventPublisher,
) error {

	party := domain.Party{PartyId: command.PartyId}
	generatedEvents, err := party.UpdateContactInfo(command.Emails, command.PhoneNumbers)
	if err != nil {
		return err
	}

	err = eventStore.Save(generatedEvents)
	if err != nil {
		return err
	}

	err = eventPublisher.Publish(generatedEvents)
	if err != nil {
		return err
	}

	fmt.Printf("PartyID: %s\n", command.PartyId)
	return nil
}

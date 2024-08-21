package domain

import (
	"az-func-go/UpdateContactInfo/events"
	"az-func-go/UpdateContactInfo/model"
	"errors"
)

type Party struct {
	PartyId      string
	Emails       []model.UpdateEmailItem
	PhoneNumbers []model.UpdatePhoneItem
}

func (p *Party) UpdateContactInfo(emails []model.UpdateEmailItem, phones []model.UpdatePhoneItem) ([]events.DomainEvent, error) {
	if len(emails) == 0 && len(phones) == 0 {
		return nil, errors.New("no contact info provided")
	}

	var generatedEvents []events.DomainEvent
	if len(emails) > 0 {
		generatedEvents = append(generatedEvents, events.EmailUpdatedEvent{PartyId: p.PartyId, Emails: emails})
	}
	if len(phones) > 0 {
		generatedEvents = append(generatedEvents, events.PhoneUpdatedEvent{PartyId: p.PartyId, Phones: phones})
	}

	return generatedEvents, nil
}

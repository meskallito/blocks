package events

import (
	"az-func-go/UpdateContactInfo/model"
	"fmt"
)

type EmailUpdatedEvent struct {
	PartyId string
	Emails  []model.UpdateEmailItem
}

type PhoneUpdatedEvent struct {
	PartyId string
	Phones  []model.UpdatePhoneItem
}

func HandleEmailUpdatedEvent(event EmailUpdatedEvent) {
	fmt.Printf("Updating read model for emails: %v\n", event.Emails)
}

func HandlePhoneUpdatedEvent(event PhoneUpdatedEvent) {
	fmt.Printf("Updating read model for phones: %v\n", event.Phones)
}

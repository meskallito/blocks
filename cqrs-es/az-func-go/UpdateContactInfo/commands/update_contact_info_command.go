package commands

import (
	"az-func-go/UpdateContactInfo/model"
)

// UpdateContactInfoCommand represents the command to update contact info

type UpdateContactInfoCommand struct {
	PartyId      string                  `json:"partyId"`
	Emails       []model.UpdateEmailItem `json:"emails"`
	PhoneNumbers []model.UpdatePhoneItem `json:"phoneNumbers"`
}

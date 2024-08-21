package model

type UpdateEmailItem struct {
	Email    string `json:"email"`
	Category string `json:"type"`
}

type UpdatePhoneItem struct {
	Phone    string `json:"phone"`
	Category string `json:"type"`
}

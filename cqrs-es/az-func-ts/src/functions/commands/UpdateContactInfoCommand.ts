export interface EmailUpdateRequest {
    email: string;
    type: string;
}

export interface PhoneUpdateRequest {
    phoneNumber: string;
    type: string;
}

export interface UpdateContactInfoCommand {
    partyId: string;
    emails: EmailUpdateRequest[];
    phoneNumbers: PhoneUpdateRequest[];
}
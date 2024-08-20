import { AggregateRoot } from "./AggregateRoot";
import { EmailUpdateRequest, PhoneUpdateRequest } from "../commands/UpdateContactInfoCommand";
import { ContactInfoUpdated } from "./ContactInfoUpdated";

export class Party extends AggregateRoot {
    public emails: EmailUpdateRequest[] = [];
    public phoneNumbers: PhoneUpdateRequest[] = [];

    constructor(id: string, emails: EmailUpdateRequest[] = [], phoneNumbers: PhoneUpdateRequest[] = []) {
        super(id);
        this.emails = emails;
        this.phoneNumbers = phoneNumbers;
    }

    updateContactInfo(emails: EmailUpdateRequest[], phoneNumbers: PhoneUpdateRequest[]): void {
        this.apply(new ContactInfoUpdated(this.id, emails, phoneNumbers));
    }

    applyEvent(event: ContactInfoUpdated): void {
        this.onContactInfoUpdated(event);
    }

    private onContactInfoUpdated(event: ContactInfoUpdated): void {
        this.emails = event.emails;
        this.phoneNumbers = event.phoneNumbers;
    }
}
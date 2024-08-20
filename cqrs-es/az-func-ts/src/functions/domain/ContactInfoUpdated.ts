import { EmailUpdateRequest, PhoneUpdateRequest } from "../commands/UpdateContactInfoCommand";
import { DomainEvent } from "./DomainEvent";
import { v4 as uuidv4 } from 'uuid';

export class ContactInfoUpdated implements DomainEvent {
    public readonly eventId: string;
    public readonly occurredOn: Date;
    public readonly eventType: string = "ContactInfoUpdated";

    constructor(
        public readonly aggregateId: string,
        public readonly emails: EmailUpdateRequest[],
        public readonly phoneNumbers: PhoneUpdateRequest[]
    ) {
        this.eventId = generateUniqueId(); 
        function generateUniqueId(): string {
            return uuidv4();
        }
        this.occurredOn = new Date();
    }
}
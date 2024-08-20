import { DomainEvent } from "../domain/DomainEvent";
import { EventListener } from "./EventListener";
import { ReadModelPartyRepository } from "../repositories/ReadModelPartyRepository";
import { ContactInfoUpdated } from "../domain/ContactInfoUpdated";

export class ContactInfoUpdatedListener implements EventListener<ContactInfoUpdated> {
    constructor(private readonly readModelRepository: ReadModelPartyRepository) {}

    async handle(event: ContactInfoUpdated): Promise<void> {
        const readModel = await this.readModelRepository.getById(event.aggregateId);
        readModel.updateContactInfo(event.emails, event.phoneNumbers);
        await this.readModelRepository.save(readModel);
    }
}
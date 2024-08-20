import { describe, expect, test, beforeEach } from "@jest/globals";
import { PartyRepositoryImpl } from "../repositories/PartyRepositoryImpl";
import { InMemoryEventBus } from "../events/InMemoryEventBus";
import { Party } from "../domain/Party";
import { UpdateContactInfoCommandHandler } from "./UpdateContactInfoCommandHandler";
import { ContactInfoUpdated } from "../domain/ContactInfoUpdated";

describe("UpdatedContactInfoCommandHandler", () => {

    test("should update contact info", () => {
        // Arrange
        const partyRepository = new PartyRepositoryImpl();
        partyRepository.save(new Party("1", [], []));

        const handler = new UpdateContactInfoCommandHandler(partyRepository, new InMemoryEventBus());
        // Act
        handler.handle({
            partyId: "1",
            emails: [{ email: "sv.krasnov@gmail.com", type: "HOME" }],
            phoneNumbers: [{ phoneNumber: "6469840960", type: "HOME" }]
        });
        // Assert
        partyRepository.getById("1").then(party => {
            expect(party.emails[0].email).toEqual("sv.krasnov@gmail.com");
            expect(party.getUncommittedEvents().length).toEqual(1);
            expect(party.getUncommittedEvents()[0]).toBeInstanceOf(ContactInfoUpdated);
        });

    });
});
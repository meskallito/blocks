import { PartyRepository } from "./PartyRepository";
import { Party } from "../domain/Party";

export class PartyRepositoryImpl implements PartyRepository {
    private readonly parties: Map<string, Party> = new Map();

    async getById(partyId: string): Promise<Party | null> {
        return this.parties.get(partyId) ?? null;
    }

    async save(party: Party): Promise<void> {
        this.parties.set(party.id, party);
    }
}
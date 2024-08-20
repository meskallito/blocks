import { Party } from "../domain/Party";

export interface PartyRepository {
    getById(partyId: string): Promise<Party | null>;
    save(party: Party): Promise<void>;
}
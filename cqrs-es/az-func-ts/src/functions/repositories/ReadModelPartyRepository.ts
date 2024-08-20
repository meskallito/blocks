import { Party } from "../domain/Party";

export interface ReadModelPartyRepository {
    getById(partyId: string): Promise<Party | null>;
    save(party: Party): Promise<void>;
}
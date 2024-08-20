import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { UpdateContactInfoCommand } from "./commands/UpdateContactInfoCommand";
import { PartyRepositoryImpl } from "./repositories/PartyRepositoryImpl";
import { UpdateContactInfoCommandHandler } from "./commands/UpdateContactInfoCommandHandler";
import { InMemoryEventBus } from "./events/InMemoryEventBus";
import { Party } from "./domain/Party";


const partyRepository = new PartyRepositoryImpl();
partyRepository.save(new Party("1", [], []));

export async function ContactInfoUpdate(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const command: UpdateContactInfoCommand = JSON.parse(await request.text());
    context.log(`Http function processed request for url "${JSON.stringify(command)}"`);

    const handler = new UpdateContactInfoCommandHandler(partyRepository, new InMemoryEventBus());
    handler.handle(command);

    partyRepository.getById("1").then(party => {
        console.log(`Current events: ${JSON.stringify(party.getUncommittedEvents())}`);
    });

    return { status: 200, body: "Contact info updated" };
};

app.http('ContactInfoUpdate', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: ContactInfoUpdate
});

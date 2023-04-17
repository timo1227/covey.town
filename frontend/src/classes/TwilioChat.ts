import { Conversation, Client } from '@twilio/conversations';

export async function newClient(chatToken: string): Promise<Client> {
  const client = new Client(chatToken);

  client.on('stateChanged', state => {
    if (state == 'initialized') return client;
  });

  throw Error('Unable to initialize client');
}

export async function getConversationFromSID(
  chatToken: string | undefined,
  conversationSID: string | undefined,
): Promise<Conversation | undefined> {
  if (chatToken === undefined || conversationSID === undefined) {
    throw Error('Chat token or chat SID are undefined. Unable to get conversation');
  }
  const client = newClient(chatToken);

  try {
    const conversation = (await client).getConversationBySid(conversationSID);
    return await conversation;
  } catch {
    return undefined;
  }
}

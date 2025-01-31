import { nanoid } from 'nanoid';
import { ChatMessage } from '../types/CoveyTownSocket';
import TownController from './TownController';
import { Conversation, Client } from '@twilio/conversations';

/**
 * A basic representation of a text conversation, bridged over a socket.io client
 * The interface to this class was designed to closely resemble the Twilio Conversations API,
 * to make it easier to use as a drop-in replacement.
 */
export default class TextConversation {
  private _coveyTownController: TownController;

  private _callbacks: MessageCallback[] = [];

  private _authorName: string;

  /**
   * Create a new Text Conversation
   *
   * @param socket socket to use to send/receive messages
   * @param authorName name of message author to use as sender
   */
  public constructor(coveyTownController: TownController) {
    this._coveyTownController = coveyTownController;
    this._authorName = coveyTownController.userName;
    this._coveyTownController.addListener('chatMessage', (message: ChatMessage) => {
      message.dateCreated = new Date(message.dateCreated);
      this._onChatMessage(message);
    });
  }

  private _onChatMessage(message: ChatMessage) {
    this._callbacks.forEach(cb => cb(message));
  }

  /**
   * Send a text message to this channel
   * @param message
   */
  public sendGlobalMessage(message: string) {
    const msg: ChatMessage = {
      sid: nanoid(),
      body: message,
      author: this._authorName,
      dateCreated: new Date(),
    };
    this._coveyTownController.emitChatMessage(msg);
  }

  /**
   * Register an event listener for processing new chat messages
   * @param event
   * @param cb
   */
  public onMessageAdded(cb: MessageCallback) {
    this._callbacks.push(cb);
  }

  /**
   * Removes an event listener for processing new chat messages
   * @param cb
   */
  public offMessageAdded(cb: MessageCallback) {
    this._callbacks = this._callbacks.filter(_cb => _cb !== cb);
  }

  /**
   * Release the resources used by this conversation
   */
  public close(): void {
    this._coveyTownController.removeAllListeners('chatMessage');
  }
}
type MessageCallback = (message: ChatMessage) => void;

export async function newClient(chatToken: string): Promise<Client | undefined> {
  const client = new Client(chatToken);

  client.on('stateChanged', state => {
    if (state == 'initialized') return client;
  });

  return undefined;
}

export async function addConversation(name: string | undefined, client: Client) {
  if (client === undefined) {
    return undefined;
  }
  if (name === undefined || name.length === 0) {
    return undefined;
  }

  try {
    const conversation = await client.createConversation({
      friendlyName: name,
    });

    return conversation;
  } catch {
    return undefined;
  }
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
    const conversation = (await client)?.getConversationBySid(conversationSID);
    return await conversation;
  } catch {
    return undefined;
  }
}

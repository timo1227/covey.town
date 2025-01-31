import dotenv from 'dotenv';
import Twilio from 'twilio';
import { Conversation, Client } from '@twilio/conversations';
import { logError } from '../Utils';

dotenv.config();

const MISSING_TOKEN_NAME = 'missing';
export default class TwilioChat {
  private static _instance: TwilioChat;

  private _twilioAccountSid: string;

  private _twilioApiKeySID: string;

  private _twilioApiKeySecret: string;

  // Used specifically for creating Chat tokens
  private _twilioChatServiceSID: string;

  private constructor(
    twilioAccountSid: string,
    twilioAPIKeySID: string,
    twilioAPIKeySecret: string,
    twilioChatServiceSID: string,
  ) {
    this._twilioAccountSid = twilioAccountSid;
    this._twilioApiKeySID = twilioAPIKeySID;
    this._twilioApiKeySecret = twilioAPIKeySecret;
    this._twilioChatServiceSID = twilioChatServiceSID;
  }

  public static getInstance(): TwilioChat {
    if (!TwilioChat._instance) {
      TwilioChat._instance = new TwilioChat(
        process.env.TWILIO_ACCOUNT_SID || MISSING_TOKEN_NAME,
        process.env.TWILIO_API_KEY_SID || MISSING_TOKEN_NAME,
        process.env.TWILIO_API_KEY_SECRET || MISSING_TOKEN_NAME,
        process.env.TWILIO_CHAT_SERVICE_SID || MISSING_TOKEN_NAME,
      );
    }
    return TwilioChat._instance;
  }

  async getTokenForChat(clientIdentity: string): Promise<string> {
    if (
      this._twilioAccountSid === MISSING_TOKEN_NAME ||
      this._twilioApiKeySID === MISSING_TOKEN_NAME ||
      this._twilioApiKeySecret === MISSING_TOKEN_NAME ||
      this._twilioChatServiceSID === MISSING_TOKEN_NAME
    ) {
      logError(
        'Twilio tokens missing. Chat will be disabled, and conversation areas will not work. Please be sure to configure the variables in the townService .env file as described in the README',
      );
      return MISSING_TOKEN_NAME;
    }

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new Twilio.jwt.AccessToken(
      this._twilioAccountSid,
      this._twilioApiKeySID,
      this._twilioApiKeySecret,
      { identity: clientIdentity },
    );

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new Twilio.jwt.AccessToken.ChatGrant({
      serviceSid: this._twilioChatServiceSID,
    });
    token.addGrant(chatGrant);
    return token.toJwt();
  }
}

export async function addConversation(
  name: string | undefined,
  client: Client | undefined,
): Promise<Conversation | undefined> {
  if (client === undefined) {
    logError('Client is suddenly undefined, are you sure everything is ok?');
    return undefined;
  }
  if (name === undefined || name.length === 0) {
    logError('Conversation name is empty');
    return undefined;
  }

  try {
    const conversation = await client.createConversation({
      friendlyName: name,
    });

    return conversation;
  } catch {
    logError('There was a problem creating the conversation');
    return undefined;
  }
}

export async function removeConversation(conversation?: Conversation) {
  if (conversation === undefined) {
    logError('Conversation is suddenly undefined, could not remove conversation.');
    return undefined;
  }

  try {
    const result = await conversation.delete();
    return result;
  } catch {
    logError('Unable to remove conversation');
    return undefined;
  }
}

export async function addChatParticipant(identity: string, conversation?: Conversation) {
  if (conversation === undefined) {
    logError('Conversation is suddenly undefined, could not add participant.');
    return;
  }

  try {
    await conversation.add(identity);
    // return result;
  } catch {
    logError('Unable to add participant.');
    // return;
  }
}

export async function removeChatParticipant(identity: string, conversation?: Conversation) {
  if (conversation === undefined) {
    logError('Conversation is suddenly undefined, could not remove participant.');
    return;
  }

  try {
    conversation.removeParticipant(identity);
    return;
  } catch {
    logError('Unable to remove participant.');
  }
}

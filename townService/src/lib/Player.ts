import { nanoid } from 'nanoid';
import { Client } from '@twilio/conversations';
import { Player as PlayerModel, PlayerLocation, TownEmitter } from '../types/CoveyTownSocket';

/**
 * Each user who is connected to a town is represented by a Player object
 */
export default class Player {
  /** The current location of this user in the world map * */
  public location: PlayerLocation;

  /** The unique identifier for this player * */
  private readonly _id: string;

  /** The player's username, which is not guaranteed to be unique within the town * */
  private readonly _userName: string;

  /** The secret token that allows this client to access our Covey.Town service for this town * */
  private readonly _sessionToken: string;

  /** The secret token that allows this client to access our video resources for this town * */
  private _videoToken?: string;

  /** The secret token that allows this client to access chat resources for this town */
  private _chatToken?: string;

  private _chatClient?: Client;

  /** A special town emitter that will emit events to the entire town BUT NOT to this player */
  public readonly townEmitter: TownEmitter;

  constructor(userName: string, townEmitter: TownEmitter) {
    this.location = {
      x: 0,
      y: 0,
      moving: false,
      rotation: 'front',
    };
    this._userName = userName;
    this._id = nanoid();
    this._sessionToken = nanoid();
    this.townEmitter = townEmitter;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  set videoToken(value: string | undefined) {
    this._videoToken = value;
  }

  get videoToken(): string | undefined {
    return this._videoToken;
  }

  set chatToken(value: string | undefined) {
    this._chatToken = value;
  }

  get chatToken(): string | undefined {
    return this._chatToken;
  }

  set chatClient(value: Client | undefined) {
    this._chatClient = value;
  }

  get chatClient(): Client | undefined {
    return this._chatClient;
  }

  get sessionToken(): string {
    return this._sessionToken;
  }

  toPlayerModel(): PlayerModel {
    return {
      id: this._id,
      chatToken: this._chatToken,
      location: this.location,
      userName: this._userName,
    };
  }
}

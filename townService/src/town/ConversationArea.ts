import { ITiledMapObject } from '@jonbell/tiled-map-type-guard';
import { Conversation } from '@twilio/conversations';
import Player from '../lib/Player';
import {
  BoundingBox,
  ConversationArea as ConversationAreaModel,
  TownEmitter,
} from '../types/CoveyTownSocket';
import InteractableArea from './InteractableArea';
import { addChatParticipant, removeChatParticipant, removeConversation } from '../lib/TwilioChat';

export default class ConversationArea extends InteractableArea {
  /* The topic of the conversation area, or undefined if it is not set */
  public topic?: string;

  /* Conversation area Twilio conversation */
  public conversation?: Conversation;

  /**
   * The chat token of the conversation area, allows us to create or destroy conversations
   * as players leave/join or topic changes */
  private _chatToken?: string;

  /** The conversation area is "active" when there are players inside of it  */
  public get isActive(): boolean {
    return this._occupants.length > 0;
  }

  /**
   * Creates a new ConversationArea
   *
   * @param conversationAreaModel model containing this area's current topic and its ID
   * @param coordinates  the bounding box that defines this conversation area
   * @param townEmitter a broadcast emitter that can be used to emit updates to players
   */
  public constructor(
    { topic, id }: ConversationAreaModel,
    coordinates: BoundingBox,
    townEmitter: TownEmitter,
  ) {
    super(id, coordinates, townEmitter);
    this.topic = topic;
  }

  /**
   * Adds a new player to this conversation area.
   *
   * Extends the base behavior of InteractableArea to add the player to the Twilio Conversation
   * of this ConversationArea.
   *
   * @param player Player to add
   */
  public add(player: Player): void {
    super.add(player);
    if (this.conversation !== undefined) addChatParticipant(player.id, this.conversation);
  }

  /**
   * Removes a player from this conversation area.
   *
   * Extends the base behavior of InteractableArea to set the topic of this ConversationArea to undefined and
   * emit an update to other players in the town, delete the Twilio conversation and set conversation to undefined when the last player leaves.
   *
   * @param player
   */
  public remove(player: Player) {
    if (this.conversation !== undefined) removeChatParticipant(player.id, this.conversation);
    super.remove(player);
    if (this._occupants.length === 0) {
      this.topic = undefined;
      if (this.conversation !== undefined) removeConversation(this.conversation);
      // this.conversation?.on('removed', this._emitAreaChanged );
      this._emitAreaChanged();
    }
  }

  set chatToken(value: string | undefined) {
    this._chatToken = value;
  }

  get chatToken() {
    return this._chatToken;
  }

  /**
   * Given a list of players, adds all of the players that are within this interactable area
   *
   * @param allPlayers list of players to examine and potentially add to this interactable area
   */
  public addPlayersWithinBounds(allPlayers: Player[]) {
    allPlayers
      .filter(eachPlayer => this.contains(eachPlayer.location))
      .forEach(eachContainedPlayer => {
        this.add(eachContainedPlayer);
      });
  }

  /**
   * Convert this ConversationArea instance to a simple ConversationAreaModel suitable for
   * transporting over a socket to a client.
   */
  public toModel(): ConversationAreaModel {
    return {
      id: this.id,
      chatToken: this._chatToken,
      conversationSID: this.conversation?.sid,
      occupantsByID: this.occupantsByID,
      topic: this.topic,
    };
  }

  /**
   * Creates a new ConversationArea object that will represent a Conversation Area object in the town map.
   * @param mapObject An ITiledMapObject that represents a rectangle in which this conversation area exists
   * @param broadcastEmitter An emitter that can be used by this conversation area to broadcast updates
   * @returns
   */
  public static fromMapObject(
    mapObject: ITiledMapObject,
    broadcastEmitter: TownEmitter,
  ): ConversationArea {
    const { name, width, height } = mapObject;
    if (!width || !height) {
      throw new Error(`Malformed viewing area ${name}`);
    }
    const rect: BoundingBox = { x: mapObject.x, y: mapObject.y, width, height };
    return new ConversationArea({ id: name, occupantsByID: [] }, rect, broadcastEmitter);
  }
}

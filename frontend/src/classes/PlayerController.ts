import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { Player as PlayerModel, PlayerLocation } from '../types/CoveyTownSocket';

export type PlayerEvents = {
  movement: (newLocation: PlayerLocation) => void;
};

export type PlayerGameObjects = {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  label: Phaser.GameObjects.Text;
  locationManagedByGameScene: boolean /* For the local player, the game scene will calculate the current location, and we should NOT apply updates when we receive events */;
};
export default class PlayerController extends (EventEmitter as new () => TypedEmitter<PlayerEvents>) {
  private _location: PlayerLocation;

  private readonly _id: string;

  private readonly _chatToken: string | undefined;

  private readonly _userName: string;

  public gameObjects?: PlayerGameObjects;

  constructor(
    id: string,
    chatToken: string | undefined,
    userName: string,
    location: PlayerLocation,
  ) {
    super();
    this._id = id;
    this._chatToken = chatToken;
    this._userName = userName;
    this._location = location;
  }

  set location(newLocation: PlayerLocation) {
    this._location = newLocation;
    this._updateGameComponentLocation();
    this.emit('movement', newLocation);
  }

  get location(): PlayerLocation {
    return this._location;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get chatToken(): string | undefined {
    return this._chatToken;
  }

  toPlayerModel(): PlayerModel {
    return {
      id: this.id,
      chatToken: this.chatToken,
      userName: this.userName,
      location: this.location,
    };
  }

  private _updateGameComponentLocation() {
    if (this.gameObjects && !this.gameObjects.locationManagedByGameScene) {
      const { sprite, label } = this.gameObjects;
      if (!sprite.anims) return;
      sprite.setX(this.location.x);
      sprite.setY(this.location.y);
      label.setX(this.location.x);
      label.setY(this.location.y - 20);
      if (this.location.moving) {
        sprite.anims.play(`misa-${this.location.rotation}-walk`, true);
      } else {
        sprite.anims.stop();
        sprite.setTexture('atlas', `misa-${this.location.rotation}`);
      }
    }
  }

  static fromPlayerModel(modelPlayer: PlayerModel): PlayerController {
    return new PlayerController(
      modelPlayer.id,
      modelPlayer.chatToken,
      modelPlayer.userName,
      modelPlayer.location,
    );
  }
}

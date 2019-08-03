/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";

export class MainScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("player", "./src/boilerplate/assets/kayak.png");
  }

  init(): void {
  }

  create(): void {
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2,
      key: "player"
    });
  }

  update(): void {
    // update objects
    this.player.update();
  }
}

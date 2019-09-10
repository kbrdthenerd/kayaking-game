/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */


export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private physicsBody: Phaser.Physics.Arcade.Body
  private speed

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);
    this.setDisplaySize(50, 100)

    this.initPhysics()
    this.initInput()
    this.initImage()

    this.scene.add.existing(this);
  }

  private initPhysics(): void {
    this.speed = 0
    this.scene.physics.world.enable(this);
    this.body.setSize(50, 100);
    this.physicsBody = this.body
  }
  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    console.log(this.originX)
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.cursors.right.on('down', () => { 
      this.paddle('negative')
    })

    this.cursors.left.on('down', () => { 
      this.paddle('positive')
    })
  }

  update(): void {
    // this.scene.physics.velocityFromRotation(this.physicsBody.rotation, 100, this.physicsBody.velocity)
  }

  paddle (direction: String) {
    const changeInAngularVelocity = 5
    const maxAngluerVelocity = 15
    if(direction === 'positive') {
      this.physicsBody.angularVelocity = Math.min(this.physicsBody.angularVelocity + changeInAngularVelocity, maxAngluerVelocity)
    } else {
      this.physicsBody.angularVelocity = Math.max(this.physicsBody.angularVelocity - changeInAngularVelocity, -maxAngluerVelocity)
    }
    this.physicsBody.angularDrag = 2
    this.physicsBody.setAllowDrag(true)
    this.scene.physics.velocityFromAngle(this.physicsBody.rotation - 90, 50, this.physicsBody.velocity)
    this.physicsBody.setDragY(30)
    this.physicsBody.setDragX(30)
  }
}

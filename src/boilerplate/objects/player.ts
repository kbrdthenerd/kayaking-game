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
    this.physicsBody.setAllowDrag(true)
    this.physicsBody.angularDrag = 2
    this.physicsBody.setDragY(30)
    this.physicsBody.setDragX(30)
  }
  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    console.log(this.originX)
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    const spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cursors.right.on('down', () => { 
      if(spaceBar.isDown) {
        this.paddle('positive', 'backward')
      } else {
        this.paddle('negative', 'forward')
      }
    })

    this.cursors.left.on('down', () => { 
      if(spaceBar.isDown) {
        this.paddle('negative', 'backward')
      } else {
        this.paddle('positive', 'forward')
      }
    })
  }

  update(): void {
    // this.scene.physics.velocityFromRotation(this.physicsBody.rotation, 100, this.physicsBody.velocity)
  }

  paddle (angleChange: String, direction) {
    const changeInAngularVelocity = 5
    const maxAngluerVelocity = 15
    if(angleChange === 'positive') {
      this.physicsBody.angularVelocity = Math.min(this.physicsBody.angularVelocity + changeInAngularVelocity, maxAngluerVelocity)
    } else {
      this.physicsBody.angularVelocity = Math.max(this.physicsBody.angularVelocity - changeInAngularVelocity, -maxAngluerVelocity)
    }
    const angle = direction === 'forward' ? - 90 : 90
    this.scene.physics.velocityFromAngle(this.physicsBody.rotation + angle, 50, this.physicsBody.velocity)
  }
}

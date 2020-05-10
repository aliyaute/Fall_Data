let gamescene = {
  preload: preload,
  create: create,
  update: update
}
let player
let emitter
let particles
let stars
let bombs
let platforms
let cursors
let score = 0
let gameOver = false
let scoreText
function collectStar (player, star) {
  score = score + 100000
  console.log('score is', score)
  scoreText.setText('score: ' + score)
  star.disableBody(true, true)
}
function preload () {
  // Hey, I want to talk about an image
  // let's call it sky
  this.load.image('sky', 'assets/sky.png')
  this.load.spritesheet('character', 
    'assets/character.png',
    { frameWidth: 32, frameHeight: 48 }
  )
  // Load the image for platform.png
  // Load the image for star.png
  this.load.image('platform', 'assets/platform.png')
  this.load.image('star', 'assets/star.png')
  cursors = this.input.keyboard.createCursorKeys()
}
function create () {
  scoreText = this.add.text(16, 16, 
    'score: 0', 
    { 
      fontSize: '32px',
      fill: '#000' 
    })
  scoreText.setDepth(10)
  this.anims.create({
    key: 'face',
    frames: [ { key: 'character', frame: 4 } ],
    frameRate: 20
  })
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('character', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  // Add the 'sky' image
  this.add.image(400, 300, 'sky')
  // Add a platform on the screen
  // Add a star on the screen
  this.add.image(100, 200, 'star')
  // I'm going to make a group of things, we're
  // going to treat them all the same!!!
  platforms = this.physics.add.staticGroup()
  // add a platform at 200,300
  platforms.create(400, 568, 'platform').setScale(2).refreshBody()
  platforms.create(600, 400, 'platform')
  platforms.create(50, 250, 'platform')
  platforms.create(750, 220, 'platform')    
  player = this.physics.add.sprite(100, 100, 'character')
  player.setBounce(0.2)
  player.setCollideWorldBounds(true)
  this.physics.add.collider(player, platforms)
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  })
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4))
  })
  // but make sure they land
  this.physics.add.collider(stars, platforms)
  this.physics.add.overlap(player, stars, collectStar, null, this)
}
function update () {
  player.setVelocityX(0)
  if(cursors.left.isDown) {
    player.anims.play('left', true)
    player.setVelocityX(-350)
  } else if(cursors.right.isDown) {
    player.anims.play('right', true)
    player.setVelocityX(350)
  } else {
    player.anims.play('face', true)
  }
  // if you push up, make your character jump
  if(cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400)
  }
}
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: [gamescene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {
          y: 300
        }
      }
    },
}
const game = new Phaser.Game(config)
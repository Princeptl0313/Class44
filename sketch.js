
var trex, trex_running, edges, ground, groundImage, invisibleGround,trexCollided
var cloudImage, obstacleimg1, obstacleimg2, obstacleimg3, obstacleimg4, obstacleimg5, obstacleimg6
var Score=0, cloudGroup,obstacleGroup
var PLAY=1,END=0
var gameState=PLAY
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacleimg1 = loadImage("obstacle1.png")
  obstacleimg2 = loadImage("obstacle2.png")
  obstacleimg3 = loadImage("obstacle3.png")
  obstacleimg4 = loadImage("obstacle4.png")
  obstacleimg5 = loadImage("obstacle5.png")
  obstacleimg6 = loadImage("obstacle6.png")
  trexCollided = loadAnimation("trex_collided.png")
}

function setup() {
  createCanvas(600, 200)
  trex = createSprite(50, 180, 20, 50)
  trex.scale = 0.5
  trex.debug=true
  trex.setCollider("circle",0,0,40)
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided",trexCollided)
  edges = createEdgeSprites()
  //create a trex sprite
  ground = createSprite(200, 180, 600, 20)
  ground.addImage(groundImage)
   invisibleGround = createSprite(200, 190, 400, 10)
  invisibleGround.visible = false
  cloudGroup=new Group()
  obstacleGroup=new Group()

}

function draw() {
  background("Red")
  text("Your Score: "+Score,506,32)
  if(gameState ===PLAY){
    ground.velocityX = -2
    Score=Score+Math.round(frameCount/250)
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10
    }
    trex.velocityY = trex.velocityY + 0.9
    spawnClouds()
    spawnObstacles()
    if(obstacleGroup.isTouching(trex)){
      gameState=END
    }
  }
  else if(gameState ===END){
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trexCollided)
    trex.velocityY=0
  }     
  trex.collide(invisibleGround)

 
  text(mouseX + "," + mouseY, mouseX, mouseY)
  drawSprites()

}
function spawnClouds() {
  if (frameCount % 60 == 0) {

    var cloud = createSprite(600, 65, 20, 20)
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.7
    cloud.velocityX = -4
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloudGroup.add(cloud) 
    cloud.lifetime = 200;
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {

    var obstacle = createSprite(600, 165, 10, 10)

    
    obstacle.velocityX = -6
   
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1:
        obstacle.addImage(obstacleimg1)
        break
      case 2:
        obstacle.addImage(obstacleimg2)
        break
      case 3:
        obstacle.addImage(obstacleimg3)
        break
      case 4:
        obstacle.addImage(obstacleimg4)
        break
      case 5:
        obstacle.addImage(obstacleimg5)
        break
      case 6:
        obstacle.addImage(obstacleimg6)      
    }
    obstacle.scale = 0.8
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 200;
  }
}
var PLAY=1
var END=0

var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var love=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(displayWidth,displayHeight) 
  
monkey=createSprite(displayWidth/20,displayHeight-50)
monkey.addAnimation("m",monkey_running)
  monkey.scale=0.15*(displayWidth/600)
  bananaGroup=new Group()
  ground=createSprite(displayWidth/2,displayHeight-30,displayWidth*5,50) 
 ground.shapeColor="green"
  obstacleGroup=new Group()
  monkey.setCollider("circle",0,0,300)
  monkey.debug=true
  
}


function draw() {
 background(220)
  fill("black")
  textSize(22*(displayHeight/600))
    
ground.velocityX=-3
  if(ground.x<displayWidth/2){
    ground.x=displayWidth
  } 

  text("Survival Score:  "+ score+"   Happiness: "+ love,10,displayHeight/6)
  monkey.collide(ground)
  monkey.velocityY=monkey.velocityY+1
if(gameState===PLAY){
  score=score+((frameCount%10===0))
  
 if(touches.window||(keyWentDown("space")&&ground.y-monkey.y<150)){
    monkey.velocityY=-25
   touches=[]
  }
   

   spawnBananas() 
  
  spawnObstacles()
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.bounceOff(monkey)
    bananaGroup.setLifetimeEach(0)
    love=love+10
    monkey.scale=monkey.scale+0.001
  }
  

  if(monkey.isTouching(obstacleGroup)){
   
    monkey.scale=monkey.scale-0.05
    obstacleGroup.setLifetimeEach(0)
  }
 
  if(monkey.scale<0.05*displayWidth/400){
    gameState=END
    
  
  }
} else if(gameState===END){
    obstacleGroup.setLifetimeEach(-1)
     bananaGroup.setLifetimeEach(-1)
     monkey.destroy()
    love=0
    bananaGroup.setVelocityXEach(0)
    text("You Lose",50,displayHeight/3)
     
 
} 
  
  

  
  
  
  
  drawSprites()
}
function spawnBananas(){
  
if(frameCount%150===0) { 
banana=createSprite(displayWidth+70,random(displayHeight/3,displayHeight-displayHeight/4))
banana.velocityX=-10 
  banana.addImage("baba",bananaImage)
  banana.scale=0.15*(displayWidth/1000)
  bananaGroup.add(banana)

}  
}

function spawnObstacles(){
  
if(frameCount%100===0) { 
obstacle=createSprite(displayWidth+70,displayHeight-180)
obstacle.velocityX=-(23+score/7)
  obstacle.setCollider("circle",0,0,180 )
  obstacle.debug=true
  obstacle.addImage("babu",obstacleImage)
  obstacle.scale=0.3*(displayWidth/600)
  obstacleGroup.add(obstacle)
 obstacle.lifetime=100
}  
}





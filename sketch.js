
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,gameOverImg;
var FoodGroup, obstacleGroup
var score
var backImage,backgr;
var gameOver;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
//var gameState;

function preload(){
  
  backImage=loadImage("jungle.jpg")
  
  monkey_running =  loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  gameOverImg = loadImage("gameOver.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 360);
   backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  


  
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
 // ground.velocityX=-4;
  ground.x=ground.width/2;
  
 // ground.scale = 1.5;
  console.log(ground.x)
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);   
    
  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      monkey.scale += 0.02;
      score = score + 2;

    }
     
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground); 
   
    spawnFood();
    spawnObstacles();
       
    if(obstaclesGroup.isTouching(monkey)){
       gameState = END;
    }
  }
    else if(gameState === END){
   
    backgr.velocityX = 0;
    monkey.visible = false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300,220);
 }
    
}



function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200); 
     //add image of banana
     banana.addImage(bananaImage); 
     banana.scale=0.05;  
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
     var obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

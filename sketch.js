
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var ground;

var survivalTime = 0;

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  
  monkey = createSprite(100,320,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
    
  ground = createSprite(200,380,900,50);
  ground.velocityX = -4;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);
  
  
  if (gameState === PLAY) {
    
    survivalTime = Math.ceil(frameCount/frameRate())
    
    if (keyDown("space") && monkey.y >= 320) {
      monkey.velocityY = -16; 
    }
  
  
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
  
    food();
    obstacle();
  
    monkey.velocityY = monkey.velocityY + 0.8
    
    if (monkey.isTouching(FoodGroup)) {
      score = score + 1;
      FoodGroup.destroyEach();
    }
    
    
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
    }
    
  } else if (gameState === END) {
    
    ground.velocityX = 0;
    monkey.y = 320;
    
  }
  
  monkey.collide(ground); 
  
  
  
  
  

  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time : " +survivalTime, 100,50)
  text("Score : " +score, 100, 80)
}


function food() {
  
  if (frameCount % 80 === 0) {
    var ban = createSprite(400, Math.round(random(150,200)), 10, 10);
    ban.addImage(bananaImage);
    ban.velocityX = -6;
    ban.lifetime = 66;
    ban.scale = 0.1;
    FoodGroup.add(ban);

    return ban;
  }
}


function obstacle() {
  
  if (frameCount % 300 === 0) {
    var ob = createSprite(400, Math.round(random(120,200)), 10, 10);
    ob.addImage(obstacleImage);
    ob.velocityX = -6;
    ob.lifetime = 66;
    ob.scale = 0.1;
    obstacleGroup.add(ob);

    return ob;
  }
}


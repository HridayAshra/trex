var TrexImage,trex,CloudImage,obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image,ground,invisible_ground,restart,score,restartButton,groundImage,gameOver,gameState,cactiGroup,cloudGroup,gameOverImage,trexOver;

function preload(){
 TrexImage= loadAnimation("trex1.png", "trex3.png", "trex4.png");
 obstacle1Image=loadImage("obstacle1.png");
 obstacle2Image=loadImage("obstacle2.png");
 obstacle3Image=loadImage("obstacle3.png");
 obstacle4Image=loadImage("obstacle4.png");
 obstacle5Image=loadImage("obstacle5.png");
 obstacle6Image=loadImage("obstacle6.png");
 CloudImage=loadImage("cloud.png");
 restartButton=loadImage("restart.png");
 groundImage=loadImage("ground2.png")
 gameOverImage=loadImage("gameOver.png")
 trexOver=loadImage("trex_collided.png");
}

function setup(){

createCanvas(600,400);
  
//create a trex sprite
trex = createSprite(50,480,20,50);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

gameOver=createSprite(300,100);
gameOver.addImage(gameOverImage);
gameOver.scale=2;

restart = createSprite(300,150);
restart.addImage(restartButton);
restart.scale=0.5;

//trex.setCollider(rectangle,0,0,trex.width-50,trex.height);

//forms groups of cacti and clouds respectively
cactusGroup=new Group(); 
cloudGroup=new Group();

//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage(groundImage);
ground.x = ground.width /2;

//creates invisible ground on which the trex stands
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

//allows game to be played
gameState = "play";

}
  
function draw() {
  //set background to white
  background("white");
 
 if(gameState=="play"){
  //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 159){
  trex.velocityY = -15 ;
 // playSound("ping_pong_8bit_beeep.ogg.mp3", false);
  }

  score=score+Math.round(getFrameRate()/55);

  if(score%250==0 && score != 0){
   //playSound("Microsoft-Windows-7-Startup-Sound.mp3");
  }

  trex.addAnimation("trex", TrexImage);

  //makes ground move
  ground.velocityX = -(6+score/250); 
  
  //displays score
  textSize(20);
  fill("black");
  text("score:"+score, 500,50);
    
    restart.visible=false;
    gameOver.visible=false;
  //spawn the objects
  spawnClouds();
  spawnCacti();
 }
 
 if(gameState=="over"){
   //Stops all sprites and objects
   ground.velocityX=0;
   cactusGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   trex.changeAnimation("trex");
   cactusGroup.setLifetimeEach(-5);
   cloudGroup.setLifetimeEach(-1);
   gameOver.visible=true;
   restart.visible=true;
 }
  
  //console.log(trex.y);  
  
  //loops ground
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Determines if you lose or not
  if(cactusGroup.isTouching(trex)){
    gameState="over";
  }                              
  
  if(mousePressedOver(restart)){
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    gameState="play";
    score=0;
  }
  
  
  drawSprites();
}

//contains all info about the clouds
function spawnClouds() {
var cloud_y=Math.round(random(125,300));
if(frameCount%150==0){
var cloud_size=Math.round(random(1,3));
var cloud=createSprite(399,cloud_y,10,10);
cloud.addImage(CloudImage);
cloud.scale=cloud_size;
cloud.velocityX=-(2+score/250); 
cloud.lifetime=275;
trex.depth=2;
cloud.depth=1;
cloudGroup.add(cloud);
}
}

//contains all info about cacti
function spawnCacti(){
if(frameCount%100==0){
var cacti = createSprite(400,355,0,0);
cacti.velocityX=-(6+score/250); 
var rand=Math.round(random(1,6));
  
switch(rand){
case 1:cacti.addImage(obstacle1Image);
break;
case 2:cacti.addImage(obstacle2Image);
break;
case 3:cacti.addImage(obstacle3Image);
break;
case 4:cacti.addImage(obstacle4Image);
break;
case 5:cacti.addImage(obstacle5Image);
break;
case 6:cacti.addImage(obstacle6Image);
break;
default:
break;
}   

cacti.lifetime=175;
cacti.scale=0.75;
cacti.depth=0;
cactusGroup.add(cacti);
}
}
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bee, beeAnime;
var bg;
var x1=0;
var x2;
var tree1Img,tree2Img,tree3Img,tree4Img;
var tree1,tree2,tree3,tree4;
var obs5;
var obstacles;
var honeyImg1,honeyImg2,honeys;
var scrollSpeed = 10;
var beeHive,beehiveImg
var gameState="PLAY";
//var stem,stemImg;
var honeyCount;
var platForm1,p1Img,platForm2,p2;
var wood1,woodImg,wood2;
function preload(){
beeAnime=loadAnimation("FLY_RIGHT/1.png","FLY_RIGHT/2.png","FLY_RIGHT/3.png","FLY_RIGHT/4.png","FLY_RIGHT/5.png","FLY_RIGHT/6.png")
bg=loadImage("FLY_RIGHT/forest.png");
tree1=loadImage("obstacles/tree1.png");
tree2=loadImage("obstacles/tree2.png");
tree3=loadImage("obstacles/tree3.png");
tree4=loadImage("obstacles/tree4.png");
//obs5=loadImage("obstacles/obs5.jpg");
honeyImg1=loadImage("honey1.png");
honeyImg2=loadImage("honey2.png");

beehiveImg=loadImage("beehive.png");

stemImg=loadImage("t3.png");

p1Img=loadImage("Platforms/p1.png");
p2Img=loadImage("Platforms/p2.png");
woodImg=loadImage("obstacles/wood.png");
}

function setup(){
    
createCanvas(windowWidth,windowHeight);
 honeyCount=0;
engine = Engine.create();
world = engine.world;

obstacleGroup=new Group();
honeyGroup=new Group();

 x2 = width;
 bee=createSprite(120,height-300);
 bee.addAnimation("honeybee",beeAnime) ;
 bee.scale=0.3;
 bee.velocityX=1;
 bee.velocityY=2;

 //beeHive=createSprite(300,height-200);
 //beeHive.addImage(beehiveImg);
 //beeHive.scale=0.5;
 console.log(mouseX,mouseY);
}

function draw(){
  background("white");
  Engine.update(engine);
  

  if(gameState==="PLAY"){
if(bee.isTouching(honeyGroup)){
  honeyCount=honeyCount+1;
  honeyGroup.destroyEach()
}
    if(frameCount%100===0){
     wood1=createSprite(Math.round(random(200,1000)),0);
     wood1.addImage(woodImg);
      wood1.velocityY=5;
      wood1.scale=0.5;
     if(wood1.y=180&&wood1.velocityY===5){
      wood1.velocityY=-5;
     }
    }
    // if(frameCount%120===0){
   //   wood2=createSprite(Math.round(random(200,1000)),1000);
    //  wood2.addImage(woodImg);
    //   wood2.velocityY=-5;
   //    wood2.scale=0.5;
    //  if(wood2.y=590&&wood2.velocityY===-5){
    //   wood2.velocityY=5;
    //  }
     
//stem.lifetime=500
 // }

  if(frameCount%120===0){
    platForm1=createSprite(Math.round(random(250,1200)),Math.round(random(100,350)));
    platForm1.addImage(p1Img);
    platForm1.velocityX=-2;
    
  }
  //if(frameCount%100===0){
   // platForm2=createSprite(Math.round(random(350,1200)),490,30,3000);
 //   platForm2.addImage(p2Img);
 //   platForm2.velocityX=-2;
  //  platForm2.scale=1.3;
 // }
    image(bg, x1, 0, width+10, height);
image(bg, x2, 0, width+25, height);

x1 -=scrollSpeed;
x2 -=scrollSpeed;

if(x1<= -width){
    x1 = width;
}

if(x2<=-width){
    x2=width
}
    if(keyDown("RIGHT_ARROW")){
      bee.x=bee.x+5;
    }
    if(keyDown("LEFT_ARROW")){
      bee.x=bee.x-5;
    }
    if(keyDown("UP_ARROW")){
      bee.y=bee.y-5;
    }
    if(keyDown("DOWN_ARROW")){
      bee.y=bee.y+5;
    }
    fill("black");
    textSize(22);
    text("Honey:"+honeyCount,100,100);

  if(bee.isTouching(obstacleGroup)){
   
    gameState="END"
    
  }
 
    }
    else if(gameState==="END"){
      bee.velocityX=0;
      obstacleGroup.destroyEach();
      honeyGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
      honeyGroup.setLifetimeEach(-1)
    }
   

   spawnObstacles();
   spawnHoney();

  drawSprites();
}
function spawnObstacles(){
  if(frameCount%190===0){
   obstacles=createSprite(width,510);
   obstacles.velocityX=-2;
    obstacles.scale = 1.3; 
    obstacles.lifetime= width/2
    var rand=Math.round(random(1,4));
    switch(rand){
     case 1:obstacles.addImage(tree1);
     tree1.y=500;
     tree1.scale=2;
            break;
         
     case 2:obstacles.addImage(tree2);
           
            break;
            
    case 3:obstacles.addImage(tree3);
           tree3.scale=1.5;
           break;
        
    case 4:obstacles.addImage(tree4);
    tree4.y=510;
           break;
        
    case 5:obstacles.addImage(obs5);
           break;
        
    default:break;    
        
    }
    obstacleGroup.add(obstacles) 
   }
 }
  function spawnHoney(){
    if(frameCount%230===0){
    honeys=createSprite(width-100,Math.round(random(100,300)));
    honeys.velocityX=-2;
    honeys.lifetime=width-100/2;
    var rand2=Math.round(random(1,2));
    honeys.scale = 0.4;
    
    switch(rand2){
      case 1:honeys.addImage(honeyImg1);
            break;
        
      case 2:honeys.addImage(honeyImg2);
      honeyImg2.scale=0.1;
            break;
        
      default:break;
    }
  
    honeyGroup.add(honeys);
  }
  }
  
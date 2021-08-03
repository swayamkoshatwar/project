var hero,heroImage;
var bg,bg1;
var aliens,aliens1;
var bullte1,bullet;
var helecopeter,helecopeter1;
var aliensGroup;
var bulletGroup;
var score=0;
var life=3;
var heart1,heart2;
var heart3;
var heart4;
var START=1;
var END = 0;
var gameState=START;
var gameover,gameoverImg;
var bullte2;

function preload(){
heroImage= loadImage("./images/swayam.png");  
bg1= loadImage("./images/bg3.jpg");
aliens1= loadImage("./images/aliens.png");
bullte1= loadImage("./images/bullet.png");
bullte2= loadSound("b.mp3");
helecopeter1= loadImage("./images/helecopeter.png");
heart4= loadImage("./images/heart.png");
gameoverImg=loadImage("./images/over.png");
}

function setup() {
  createCanvas(800,400);
  
  //background image
  bg = createSprite(400,200,800,400);
  bg.addImage(bg1);
  bg.scale = 0.5;

  //hero sprite
  hero = createSprite(80,270);
  hero.addImage(heroImage);
  hero.scale = 0.9;
  hero.debug=false;
  hero.setCollider("circle",0,0,160)

  //helicopter sprite
  helecopeter = createSprite(600,100);
  helecopeter.addImage(helecopeter1);
  helecopeter.scale = 0.3;

  //heart sprites
  heart1 = createSprite(103,50);
  heart1.addImage(heart4);
  heart1.scale = 0.1;
  heart2 = createSprite(57,50);
  heart2.addImage(heart4);
  heart2.scale = 0.1;
  heart3 = createSprite(80,50);
  heart3.addImage(heart4);
  heart3.scale = 0.1;

  //gameover
  gameover = createSprite(400,200);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.9;
  gameover.visible=false;

  //alien and bullet group
  aliensGroup=new Group()
  bulletGroup=new Group()
}

function draw() {
  background("skyblue");
//START state
if(gameState===START){
//alien function
spawnaliens();

//bullet shoot
if(keyDown("space")){
spawnbullet();
bullte2.play();
}
//score and destroy alen and hero
if(aliensGroup.isTouching(bulletGroup)){
  bulletGroup.destroyEach();
  aliensGroup.destroyEach();
  score=score+5;
  }
  //alien disappear
  if(aliensGroup.isTouching(hero)){
    aliensGroup.destroyEach();
    hero.visible=false;
    lifeover();
  }
}
else if(gameState===END){
  gameover.visible=true;

}
  
  drawSprites();
  fill("white");
  textSize(20);
  text("Score: "+ score, 700,50); 
  text("Lives: "+ life, 700,100);
}

function spawnaliens() {
  //write code here to spawn the clouds
   if (frameCount % 100 === 0) {
     aliens = createSprite(270,270,40,10);
    aliens.x = Math.round(random(600,800));
    aliens.addImage(aliens1);
    aliens.scale = 0.5;
    aliens.velocityX = -3;
     //assign lifetime to the variable
    aliens.lifetime = 200;
    //adding cloud to the group
   aliensGroup.add(aliens);
  
   }
  }

  function spawnbullet() {
    //write code here to spawn the clouds
     if (frameCount % 10 === 0) {
       bullet = createSprite(200,230,40,10);
      //bullet.x = Math.round(random(60,80));
      bullet.addImage(bullte1);
      bullet.scale = 0.05;
      bullet.velocityX = 10;
       //assign lifetime to the variable
       bullet.lifetime=200;
      //adding cloud to the group
     bulletGroup.add(bullet);
     }
    }

    function lifeover(){
      life=life-1;
      if(life===3){
        heart1.visible=true;
        heart2.visible=true;
        heart3.visible=true;
        hero.visible=true
      }
      else if(life===2){
        heart1.visible=false;
        heart2.visible=true;
        heart3.visible=true;
        hero.visible=true
      }
      else if(life===1){
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=true;
        hero.visible=true
      }
      else{
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=false;
        gameState=END;
        
      }
    }


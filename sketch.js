var bg,bgImage;
var player,playerImage;
var boatSound;
var fish,fishImage;
var leftfence,rightfence;
var leftimg,rightimg;
var gamestate="play";
var gameover,gameoverImage
var fishGroup;
var litter,litterImage,litterGroup;
var score=0;
var count=0;




function preload(){
  bgImage=loadImage("bg1.png");
  playerImage=loadImage("boat.png")
  fishImage=loadAnimation("fish1.png","fish2.png");
  leftimg=loadImage("leftfence.png");
  gameoverImage=loadImage("gameover.png");
  rightimg=loadImage("rightfence.png");
  boatSound=loadSound("boatsound.mp3");
  litterImage=loadImage("litterimage2.png")
}

function setup() {
  createCanvas(1000,700);


  bg=createSprite(500,300,1000,600);
  bg.addImage(bgImage);
  bg.scale=1.5;
 
  
  player=createSprite(500,600,50,50);
  player.addImage(playerImage);
  player.scale=0.65;

  leftfence=createSprite(970,350,30,1000);
  leftfence.addImage(rightimg);
  rightfence=createSprite(30,350,30,1000);
  rightfence.addImage(leftimg);
  
  
  gameover=createSprite(500,300,100,100);
  gameover.addImage(gameoverImage);

  fishGroup=new Group();
  litterGroup=new Group();

}

function draw() {
  background(0);
  drawSprites();

  player.collide(leftfence);
  player.collide(rightfence);


  if(gamestate==="play"){
    gameover.visible=false

    fill("white");
    textSize(30);
    text("Score : "+score,450,50)

    if(player.isTouching(litterGroup)){
      litterGroup.destroyEach();
      score=score+5;
    }
    count=count+1;
    bg.velocityY=5+count/100;
    if(bg.y>600){
      bg.y=300;
  
    }  
  
    if(keyDown("left")){
      player.x=player.x-5
    }
  
    if(keyDown("right")){
      player.x=player.x+5
    }
    if(keyDown("up")){
      //boatSound.play();
      player.y=player.y-5
    }
    if(keyDown("down")){
      player.y=player.y+5
    }
    var num=Math.round(random(1,2));
    if(num===1){
      spawnFish();
    }
    if(num===2){
      spawnLitter();
    }
    if(player.isTouching(fishGroup)){
      gamestate="end";
    }
    }
  else if(gamestate==="end"){
    bg.velocityY=0;
    fishGroup.setVelocityYEach(0);
    gameover.visible=true;


  }
  
  
  
}

  function spawnFish(){
    if(frameCount%150===0){
      fish=createSprite(500,0,10,40);
      fish.addAnimation("f1",fishImage);
      fish.scale=0.25;
      fish.x=random(50,950)
      fish.velocityY=5+count/100;
      fishGroup.add(fish)
    }
  }

  function spawnLitter(){
    if(frameCount%150===0){
      litter=createSprite(500,0,10,40);
      litter.addAnimation("l1",litterImage);
      litter.scale=0.15;
      litter.x=random(50,950)
      litter.velocityY=5+count/100;
      litterGroup.add(litter)

    }
  }
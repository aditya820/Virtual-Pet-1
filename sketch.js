
var dog, happyDog;
var dogSprite;
var database;
var foodS, foodStock;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dogSprite = createSprite(250,250);
  dogSprite.addImage("dog", dog);
  dogSprite.scale = 0.2;
}


function draw() {
  background("lightblue"); 
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  text("Food Stock: " + foodStock,250,200);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
   x = x - 1;
   }

   database.ref("/").update({
  Food : x
})
}




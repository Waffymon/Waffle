var trex, trex_running;
var edges;
var pasto, pasto_imagen;
var pastocomotuexbienfalso;
var nubes, nube_imagen;
var obstaculo1, obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6;
var jumps, die, checkpoint; 
var eskor=0;
var grupo_de_kaktus;
var grupo_de_nubes;
var gameState="start"
var trexchoque
var restar,restartimage;
var go,go_image;
var tero1, tero1an;


function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexchoque=loadAnimation("trex_collided.png");
  tero1an=loadAnimation("tero2.png", "tero1.png");
  
pasto_imagen = loadImage("ground2.png");
  nube_imagen= loadImage("clord.png");
  obstaculo1=loadImage("obstacle1.png");
   obstaculo2=loadImage("obstacle2.png");
   obstaculo3=loadImage("obstacle3.png");
   obstaculo4=loadImage("obstacle4.png");
   obstaculo5=loadImage("obstacle5.png");
   obstaculo6=loadImage("obstacle6.png");
  restartimage=loadImage("restart.png");
  go_image=loadImage("gameOver.png");
  
  
  jumps=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}


function setup() { 
  createCanvas(600, 200);
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexchoque", trexchoque);

  
  //lo haces más chiquito o más grande
  trex.scale = 0.5;
  trex.x = 50;
  
  restar=createSprite(300,120,20,20);
 restar.addImage(restartimage);
  restar.scale=0.5;
  restar.visible=false;
  
  go=createSprite(300,80,20,20);
  go.addImage(go_image);
  go.visible=false;
  
  
  //para ver la hit box
  trex.setCollider("circle",0,0,40)

  
  //pasto normal
  pasto=createSprite(200,180,400,10);
  pasto.addImage("pasto", pasto_imagen)
  
  //pasto falso para que le de profundidad
  pastocomotuexbienfalso=createSprite(200,190,400,10);
  pastocomotuexbienfalso.visible=false;
  //edges
  edges=createEdgeSprites();
  
  grupo_de_kaktus=new Group();
  grupo_de_nubes=new Group();
  
}

function draw() {
  background("black");
  text("Puntos "+eskor,500,70)
  //estado de inicio
  if(gameState==="start"&&keyDown("space")){
   gameState="play" 
  }
  //estado de juego
    if (gameState==="play"){
       pasto.velocityX=-3 
       nubes();
       obstaculos();
      tero();
        if(frameCount%5===0){
        eskor=eskor+1

      }
      if(eskor%100===0&&eskor>0){
       checkpoint.play(); 
      }
          if(keyDown("space")&&trex.y>120) {
        trex.velocityY = -10;
        jumps.play();
            
      }
        trex.velocityY = trex.velocityY + 0.7; 
if(trex.isTouching(grupo_de_kaktus)){
  die.play();
  trex.changeAnimation("trexchoque",trexchoque);
  gameState="end";
}
      }
  // el final
  if (gameState==="end"){
    pasto.velocityX=0;
    trex.velocityX=0;
    trex.velocityY=0;
    //velocidad par los grupos
    grupo_de_nubes.setVelocityXEach(0);
    grupo_de_kaktus.setVelocityXEach(0);
    //tiempo de vida para grupos
    grupo_de_nubes.setLifetimeEach(-1);
    grupo_de_kaktus.setLifetimeEach(-1);
    //trex.changeAnimation("collided",trexchoque);
    restar.visible=true;
    go.visible=true;
    trex.velocityY=0;
    
    if(mousePressedOver(restar)){
      revivicion();
    }
    
    
  }
  
  
  
  //el pasto se mueve hacia la izquierda

 //console.log(frameCount/100)
  if(pasto.x<0){
    pasto.x=pasto.width/2;
  }
  
  
  //aqui hace que si pasa de x altura ya no pueda saltar
  if(keyDown("space")&&trex.y>120) {
    trex.velocityY = -10;
    jumps.play();
  }
  //salto automático
 /* if(trex.isTouching(grupo_de_kaktus)){
    trex.velocityY=-11;
    jumps.play();
  }*/
  
  
  
  
 
 //aqui vamos a hacer que camine sobre el pasto falso y 
  //hacemos que se vea mas realista
  trex.collide(pastocomotuexbienfalso);

  drawSprites();
}
//aqui creamos todo lo que son las nubes e hicimos que se movieran
function nubes(){
  //aqui se hace una división para que cada 100 frames salga una nube
if(frameCount%100===0){
 var nubes=createSprite(600,20,20,20);
  // y aqui hacemos que salga en una posición random 
  var ra=Math.round(random(1,70));    
  nubes.addImage("nubes",nube_imagen);
  nubes.velocityX=-3;
  nubes.y=ra;
  //que tengan la misma densidad
  nubes.depth=trex.depth;
  //hicimos que sea más denso y eso hizo que no atravezara
  trex.depth=trex.depth+1
 // console.log("nubes"+nubes.depth);
  //para que desaparesca
  nubes.lifetime=175;
  grupo_de_nubes.add(nubes);
}
}
function obstaculos(){
  if (frameCount%145===0){
    var obstaculo=createSprite(600,160,20,20)
    obstaculo.velocityX=-4
    //es para que salga un obstáculo aleatorio
    var r=Math.round(random(1,6));
    //console.log(r);
    switch(r){
        
      case 1:
        obstaculo.addImage(obstaculo1);
        break;
        
              case 2:
        obstaculo.addImage(obstaculo2);
        break;
        case 3:
        obstaculo.addImage(obstaculo3);
        break;
        case 4:
        obstaculo.addImage(obstaculo4);
        break;
        case 5:
        obstaculo.addImage(obstaculo5);
        break;
              case 6:
        obstaculo.addImage(obstaculo6);
        break;
        
        default:
        break;
    }
    //lo mismo que la 123
    obstaculo.lifetime=175;
    obstaculo.scale=0.6;
    //es un grupo(como dice el nombre);
    grupo_de_kaktus.add(obstaculo) ;
    
    
  }
  
}

function revivicion(){
  console.log("revivitation");
  gameState="start";
  trex.changeAnimation("running",trex_running);
  grupo_de_kaktus.destroyEach();
  grupo_de_nubes.destroyEach();
  go.visible=false;
  restar.visible=false;
  eskor=0;
}

function tero(){
  if(frameCount%500===0){
    var tero1=createSprite(600,80,20,20);
    tero1.velocityX=-6
    console.log("tero")
    tero1.addAnimation("tero", tero1an)
  }
}
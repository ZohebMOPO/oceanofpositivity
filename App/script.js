//canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

let positivityscore = 0;
let gameFrame = 0;
let over = false;
ctx.font =  '35px Georgia';
const bgmusic = document.createElement('audio');
bgmusic.src = 'src/Meditation Music [Full Tracks] Royalty Free Background Music.mp3';

//Mouse Interactivity
let canvasposition = canvas.getBoundingClientRect();
const mouse= {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown',function(event){
    mouse.click = true;
    mouse.x = event.x - canvasposition.left;
    mouse.y = event.y - canvasposition.top;
    console.log(mouse.x,mouse.y);
});

canvas.addEventListener('mouseup',function(){
    mouse.click = false;
})




//Start

class Button{
    constructor(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    let btn = document.getElementById("button");
    btn.innerHTML = "Start";
    btn.onclick = function () {
    bgmusic.play();
    animate();
    };
    document.body.appendChild(btn);
    }
}
class Button2{
    constructor(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    let btn = document.getElementById("button");
    btn.innerHTML = "Continue";
    btn.onclick = function () {
    over = false;
    animate();
    };
    document.body.appendChild(btn);
    }
}

//Player
const PlayerLeft = new Image();
PlayerLeft.src = 'src/fish_swim_left.png';
const PlayerRight = new Image();
PlayerRight.src = 'src/fish_swim_right.png';
class Player {
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 60;
        this.angle = 40;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        this.angle = Math.atan2(dy, dx)
        if (mouse.x != this.x){
            this.x -= dx/24;
        }
        if (mouse.y != this.y){
            this.y -= dy/24;
        }
    }
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        if(this.x > mouse.x){
          ctx.drawImage(PlayerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 40, this.spriteWidth/4, this.spriteHeight/4);
        }else{
          ctx.drawImage(PlayerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 40, this.spriteWidth/4, this.spriteHeight/4);
        }
        ctx.restore();

    }
}
const button = new Button();
const player = new Player();

//Bubbles
const bubblesArray =[];
var bubbleimageArray = new Array(18);

bubbleimageArray[0] = new Image();
bubbleimageArray[0].src = 'src/bubble1.png';

bubbleimageArray[1] = new Image();
bubbleimageArray[1].src = 'src/bubble2.png';

bubbleimageArray[2] = new Image();
bubbleimageArray[2].src = 'src/bubble3.png';

bubbleimageArray[3] = new Image();
bubbleimageArray[3].src = 'src/bubble4.png';

bubbleimageArray[4] = new Image();
bubbleimageArray[4].src = 'src/bubble5.png';

bubbleimageArray[5] = new Image();
bubbleimageArray[5].src = 'src/bubble6.png';

bubbleimageArray[6] = new Image();
bubbleimageArray[6].src = 'src/bubble7.png';

bubbleimageArray[7] = new Image();
bubbleimageArray[7].src = 'src/bubble8.png';

bubbleimageArray[8] = new Image();
bubbleimageArray[8].src = 'src/bubble9.png';

bubbleimageArray[9] = new Image();
bubbleimageArray[9].src = 'src/bubble10.png';

bubbleimageArray[10] = new Image();
bubbleimageArray[10].src = 'src/bubble11.png';

bubbleimageArray[11] = new Image();
bubbleimageArray[11].src = 'src/bubble12.png';

bubbleimageArray[12]= new Image();
bubbleimageArray[12].src = 'src/bubble13.png';

bubbleimageArray[13] = new Image();
bubbleimageArray[13].src = 'src/bubble14.png';

bubbleimageArray[14] = new Image();
bubbleimageArray[14].src = 'src/bubble15.png';

bubbleimageArray[15] = new Image();
bubbleimageArray[15].src = 'src/bubble16.png';

bubbleimageArray[16] = new Image();
bubbleimageArray[16].src = 'src/bubble17.png';

bubbleimageArray[17] = new Image();
bubbleimageArray[17].src = 'src/bubble18.png';

var i = Math.floor( Math.random() * 19 );

class Bubble {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        i = Math.floor( Math.random() * 19 );
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
    draw(){
        if(bubbleimageArray[i]){
        ctx.drawImage(bubbleimageArray[i], this.x - 60 , this.y - 82 , this.radius *2 +6 ,this.radius *2 + 35 );
        }
    }
}

const bubblepop1 = document.createElement('audio');
bubblepop1.src = 'src/Plop.ogg';

function handlebubbles(){

    if (gameFrame % 100 == 0){
        bubblesArray.push(new Bubble());

    }
    for (let j=0; j < bubblesArray.length; j++){
        bubblesArray[j].update();
        bubblesArray[j].draw();

    }
    for (let i=0; i < bubblesArray.length; i++){
        if (bubblesArray[i].y < 0 - this.radius * 2){
            bubblesArray.splice(i, 1);
        }
        if (bubblesArray[i]){
            if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
                positivityscore++;
                bubblesArray.splice(i, 1);
                bubblepop1.play();
            }
        }
    }
}

//enemies
const EnemyLeft = new Image();
EnemyLeft.src = 'src/enemy_left.png';
const EnemyRight = new Image();
EnemyRight.src = 'src/enemy_right.png';
const enemyarray =[];
class enemy{
  constructor (){
    this.x = canvas.width +100;
    this.y = Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 3 + 1;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
    this.distance;
  }
  update(){
      this.x -= this.speed;
      const dx = this.x - player.x;
      const dy = this.y - player.y;
      this.distance = Math.sqrt(dx * dx + dy * dy)
      if(gameFrame % 5 == 0){
          this.frame++;
          if (this.frame >= 12) this.frame = 0;
          if (this.frame == 3 || this.frame == 7 || this.frame == 11 ){
                this.frameX = 0;
          }else {
              this.frameX++;
          }
          if(this.frame < 3) this.frameY = 0;
          else if(this.frame < 7) this.frameY = 1;
          else if(this.frame < 11) this.frameY = 2;
      }
  }
  draw(){
      ctx.fillStyle = 'yellow';
      ctx.beginPath();

      ctx.drawImage(EnemyLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x -70 , this.y - 50, this.radius + 100, this.radius + 50);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
  }
}

function handleenemies(){
    if (gameFrame % 500 == 79){
        enemyarray.push(new enemy());

    }
    for (let i=0; i < enemyarray.length; i++){
        enemyarray[i].update();
        enemyarray[i].draw();
    }
    for (let i=0; i < enemyarray.length; i++){
        if (enemyarray[i].x < 0 - this.radius * 2){
            enemyarray.splice(i, 1);
        }
        if (enemyarray[i].distance < enemyarray[i].radius + player.radius){
            positivityscore -= 4;
            enemyarray.splice(i, 1);
            over = true;
            ctx.fillStyle = 'white';
            ctx.font = '30px Calibri';
            ctx.fillText("Oh no! you got eaten by the Stress Shark.", canvas.width/2 - 240, 90);
            ctx.fillText("Avoid stress to stay positive! You lose 4 points", canvas.width/2 - 270, 120);
            const button = new Button2();
        }
    }
}

const enemyarray2 =[];
class enemy2{
  constructor (){
    this.x = 100 - canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 3 + 1;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
    this.distance;
  }
  update(){
    this.x += this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy)
    if(gameFrame % 5 == 0){
        this.frame++;
        if (this.frame >= 12) this.frame = 0;
        if (this.frame == 3 || this.frame == 7 || this.frame == 11 ){
              this.frameX = 0;
        }else {
            this.frameX++;
        }
        if(this.frame < 3) this.frameY = 0;
        else if(this.frame < 7) this.frameY = 1;
        else if(this.frame < 11) this.frameY = 2;
      }
    }


  draw(){
      ctx.fillStyle = 'yellow';
      ctx.beginPath();

      ctx.drawImage(EnemyRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x -70 , this.y - 50, this.radius + 100, this.radius + 50);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
  }
}

function handleenemies2(){
    if (gameFrame % 500 == 189){
        enemyarray2.push(new enemy2());
    }
    for (let i=0; i < enemyarray2.length; i++){
        enemyarray2[i].update();
        enemyarray2[i].draw();
        if (enemyarray2[i].x < 0 - this.radius * 2){
            enemyarray2.splice(i, 1);
            i--;
        } else if(enemyarray2[i].distance < enemyarray2[i].radius + player.radius){
            positivityscore -= 4;
            enemyarray2.splice(i, 1);
            i--;
            over = true;
            ctx.fillStyle = 'white';
            ctx.font = '30px Calibri';
            ctx.fillText("Oh no! You got eaten by the Overthinking Shark.", canvas.width/2 - 240, 90);
            ctx.fillText("Avoid overthinking to stay positive! You lose 4 points",canvas.width/2 - 270, 120);
            const button = new Button2();

        }
    }
}



//score
function showscore(){
        ctx.font =  '30px Georgia';
        ctx.fillStyle = 'white';
        ctx.fillText("Positivity Score: "+positivityscore, 11, 51);

}

function GameOver(){
    if(positivityscore==50){
        over = true;
        ctx.fillStyle = 'white';
        ctx.font = '40px Calibri';
        ctx.fillText("Congratulations! You have reached 50 Positvity Points", 46 , 150);
        ctx.fillText("Stay Positive!",  390, 193);
        const button = new Button3();

    }
}

class Button3{
    constructor(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    let btn = document.getElementById("button");
    btn.innerHTML = "Restart";
    btn.onclick = function () {
    over = false;
    positivityscore = 0;
    animate();
    };
    document.body.appendChild(btn);
    }
}

//Animation Loop

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    handlebubbles();
    handleenemies();
    handleenemies2();
    showscore();
    GameOver();
    gameFrame++;
    if (over==false){
    document.getElementById('button').style.visibility='hidden';
    requestAnimationFrame(animate);
  }else{
    document.getElementById('button').style.visibility='visible';
  }
}

window.addEventListener('resize',function(){
    canvasposition = canvas.getBoundingClientRect();
});

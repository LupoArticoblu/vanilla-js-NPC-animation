/*=====================Variabili globali=========================*/
//utilizzando il seguente commento otterremo dei suggerimenti per ctx sui metodi dei canvas
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const canvas4 = document.getElementById('canvas4');
const canvases = [canvas, canvas2, canvas3, canvas4];
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
const ctx4 = canvas4.getContext('2d');
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 900;

const allEnemies = []; // Array per memorizzare tutti i nemici

let gameFrame = 0;

/*======================Classi============================ */
class Enemy {
  constructor(ctx) {
    this.ctx = ctx;
    this.numberOfEnemies = Math.floor(Math.random() * 10 + 10); // Numero casuale di nemici
    this.Image = new Image();
    this.Image.src = './NPC enemy/enemy1.png';
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frameX = 0;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
  }
  
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (gameFrame % this.WingsDifferentFly === 0) {
      this.frameX > 4 ? this.frameX = 0 : this.frameX++;
    }
  }
  
  draw() {
    this.ctx.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Enemy2 extends Enemy {
  constructor(ctx) {
    super(ctx);
    this.numberOfEnemies = Math.floor(Math.random() * 20 + 10);
    this.Image.src = './NPC enemy/enemy2.png';
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 5;
  }

  update() {
    super.update();
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
  }

  draw() {
    this.ctx.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Enemy3 extends Enemy {
  constructor(ctx) {
    super(ctx);
    this.numberOfEnemies = Math.floor(Math.random() * 40 + 20);
    this.Image.src = './NPC enemy/enemy3.png';
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
  }

  update() {
    super.update();
    this.y = CANVAS_HEIGHT / 2 * Math.cos(this.angle * Math.PI / 180) + (CANVAS_HEIGHT / 2 - this.height / 2); 
    this.x = CANVAS_WIDTH / 2 * Math.sin(this.angle * Math.PI / 90) + (CANVAS_WIDTH / 2 - this.width / 2); 
    this.angle += this.angleSpeed;
  }

  draw() {
    this.ctx.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

class Enemy4 extends Enemy {
  constructor(ctx) {
    super(ctx);
    this.numberOfEnemies = Math.floor(Math.random() * 5 + 10);
    this.Image.src = './NPC enemy/enemy4.png';
    this.spriteWidth = 213;
    this.spriteHeight = 210;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.newX = this.x;
    this.newY = this.y;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    super.update();
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    const dx = this.x - this.newX;
    const dy = this.y - this.newY;
    this.x -= dx / 60;
    this.y -= dy / 80;
  }

  draw() {
    this.ctx.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

/*======================Funzioni============================ */
// Funzione per creare nemici
function createEnemies(ctx, EnemyClass) {
  const numberOfEnemies = new EnemyClass(ctx).numberOfEnemies; // Prendi il numero di nemici dalla classe
  for (let i = 0; i < numberOfEnemies; i++) {
    allEnemies.push(new EnemyClass(ctx)); // Crea e inserisci i nemici nell'array
  }
}

// Imposta la dimensione dei canvas
canvases.forEach(element => {
  element.width = CANVAS_WIDTH;
  element.height = CANVAS_HEIGHT;
});

// Crea i nemici
createEnemies(ctx, Enemy);    // Usa il contesto di canvas1
createEnemies(ctx2, Enemy2);  // Usa il contesto di canvas2
createEnemies(ctx3, Enemy3);  // Usa il contesto di canvas3
createEnemies(ctx4, Enemy4);  // Usa il contesto di canvas4


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  allEnemies.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

/*=====================Variabili globali=========================*/
//utilizzando il seguente commento otteremo dei suggerimenti per ctx sui metodi dei canvas
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
const CANVAS_HEIGHT = 1000;

const numberOfEnemies = 60;
const enemyArr = [];
const enemy2Arr = [];
const enemy3Arr = [];
const enemy4Arr = [];


// const enemyImage1 = new Image();
// enemyImage1.src = './NPC enemy/enemy1.png';

//rallentiamo la velocità degli oggetti
let gameFrame = 0;

/*======================Oggetti============================ */
// enemy1 = {
//   x:0,
//   y:0,
//   width:200,
//   height:200
// }

/*======================Classi============================ */
class Enemy {
  /**
   * Implementazione della sintassi "sintattical sugar" per la classe Enemy.
   * In questo caso, il costruttore della classe (il metodo constructor) viene chiamato automaticamente quando viene creata una nuova istanza della classe.
   * La sintassi "sintattical sugar" ci consente di scrivere il costruttore della classe in modo più conciso e leggibile.
   * Nel caso della classe Enemy, il costruttore prende 4 parametri: x, y, width e height, che vengono assegnati alle proprietà corrispondenti dell'oggetto istanza.
   * In questo modo, quando creiamo una nuova istanza della classe Enemy, possiamo passare i parametri desiderati e il costruttore li utilizzerà per inizializzare le proprietà dell'oggetto istanza.
   * Ad esempio, se creiamo una nuova istanza della classe Enemy con il seguente codice:
   * const enemy = new Enemy(10, 10, 200, 200);
   * il costruttore sarà chiamato con i parametri x = 10, y = 10, width = 200 e height = 200
   */
  constructor(){
    this.Image = new Image();
    this.Image.src = './NPC enemy/enemy1.png';
    // genera un numero casuale compreso tra -2 e 2
    // ciò ci consente di avere un movimento dell'oggetto con diverse velocità
    this.speed = Math.random() * 4 - 2;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.initialY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.y = this.initialY;
    //this.y sarà configurabile quindi usiamo il metodo Object.defineProperty
    this.frameX = 0;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
  }
  update(){
    //usiamo this.speed
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    //animiamo gli sprite
    if (gameFrame % this.WingsDifferentFly === 0) {
      this.frameX > 4 ? this.frameX = 0 : this.frameX++;  
    }
    //questo ternario funziona come un contatore per l'animazione degli sprite,ogni volta che viene eseguito update() this.frameX viene incrementato di 1
    //una volta che this.frameX raggiunge il valore di 4 viene resettato a 0
    //questo permette di creare un'animazione ciclica degli sprite ad esempio se this.frameX = 0, allora l'immagine sarà quella dell'enemy1.png a sinistra
    //se this.frameX = 1, allora l'immagine sarà quella dell'enemy1.png subito dopo ecc...
    //se this.frameX = 5, allora l'immagine è quella dell'enemy1.png subito dopo che l'animazione precedente è finita
  }
  draw(){
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y , this.width, this.height);
  }
};

class Enemy2 extends Enemy {
  constructor() {
    super();
    this.Image = new Image();
    this.Image.src = './NPC enemy/enemy2.png';
    this.speed = Math.random() * 4 + 1; // Velocità maggiore di 1 per movimento visibile
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
  }
  
  update() {
    super.update();
    // Muove i nemici verso sinistra
    this.x -= this.speed;
    this.y = this.initialY;
    // Se escono fuori dallo schermo, li facciamo rientrare
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
  }

  draw() {
    
    ctx2.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y , this.width, this.height);
  }
}

class Enemy3 extends Enemy{
  constructor(){
    super();
    this.Image = new Image();
    this.Image.src = './NPC enemy/enemy3.png';
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
  }
  draw(){
    
    ctx3.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y , this.width, this.height);
  }
}

class Enemy4 extends Enemy{
  constructor(){
    super();
    this.Image = new Image();
    this.Image.src = './NPC enemy/enemy4.png';
    this.spriteWidth = 158;
    this.spriteHeight = 150;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.WingsDifferentFly = Math.floor(Math.random() * 3) + 1;
  }
  draw(){
    
    ctx4.drawImage(this.Image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y , this.width, this.height);
  }
}

// const enemy1 = new Enemy();
// const enemy2 = new Enemy();

for (let i = 0; i < numberOfEnemies; i++){
  enemyArr.push(new Enemy());
  enemy2Arr.push(new Enemy2());
  enemy3Arr.push(new Enemy3());
  enemy4Arr.push(new Enemy4());
}

canvases.forEach(element => {
  element.width = CANVAS_WIDTH;
  element.height = CANVAS_HEIGHT;
});



console.log(enemyArr);

/*======================Funzioni============================ */
function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // enemy1.update();
  // enemy1.draw();
  enemyArr.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  enemy2Arr.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  enemy3Arr.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  enemy4Arr.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  gameFrame++;
  requestAnimationFrame(animate);
}

animate()
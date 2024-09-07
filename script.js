/*=====================Variabili globali=========================*/
//utilizzando il seguente commento otteremo dei suggerimenti per ctx sui metodi dei canvas
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 60;
const enemyArr = [];

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
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
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

// const enemy1 = new Enemy();
// const enemy2 = new Enemy();

for (let i = 0; i < numberOfEnemies; i++){
  enemyArr.push(new Enemy());
}

console.log(enemyArr);

/*======================Funzioni============================ */
function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // enemy1.update();
  // enemy1.draw();
  enemyArr.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });

  gameFrame++;
  requestAnimationFrame(animate);
}

animate()
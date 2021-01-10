//game state 0,1,2,3,4,5;main menu at 0, game at 1-3, victory at 4, lose at 5;
var state = 0;
var points = 0;
var hp = 2;
//image variables
var bg, gameTitle, menuButton, cloudD, cloudA, heartNull, heartFull;
var cdSpeed,caSpeed,cdX,caX;
var wizAni;
//sound vars
var attSound,jumpSound,bgMusic,loseSound,victorySound,clickSound;
//character attack
var magicArr = [];

//FIRST MAP
var world1;
var thePlayer1;
var door1;
var enemiesFirst = [];
var world1Parameters = {
    tileSize: 50,
    tileFolder: 'tiles',
    numTiles: 34,
    //0 is an empty block
    tileMap: [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  1,  1],
    [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [15, 14, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 27]
    ],
    solidTiles: {15:true, 14:true, 22:true, 31:true},
    gravity: .12,
    gravityMax: 8
};

//SECOND MAP
var world2;
var thePlayer2;
var door2;
var enemiesSecond = [];
var world2Parameters = {
    tileSize: 50,
    tileFolder: 'tiles',
    numTiles: 34,
    //0 is an empty block
    tileMap: [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 31, 31,  1,  1],
    [29,  0,  0,  0,  0,  0, 31,  0,  0,  0,  0,  0,  0,  0, 31,  0,  0,  5,  1,  1],
    [23,  0,  0,  0,  0,  0,  0,  0,  0, 31, 31, 31, 31,  0,  0,  0,  0,  5,  1,  1],
    [23,  0,  0,  0,  0, 31, 31, 31,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [23, 33,  0, 31,  0,  0,  0, 23,  0,  0,  0,  0,  0, 31, 31,  0,  0,  2,  1,  1],
    [23, 23, 31, 23, 31, 31, 31, 23, 31, 31, 31, 31, 31, 23, 23, 31, 31, 31, 31, 31],
    [14, 14, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 27]
    ],
    solidTiles: {22:true, 23:true, 31:true, 33:true},
    gravity: .12,
    gravityMax: 8
};

//THIRD MAP
var world3;
var thePlayer3;
var door3;
var enemiesThird = [];
var world3Parameters = {
    tileSize: 50,
    tileFolder: 'tiles',
    numTiles: 34,
    //0 is an empty block
    tileMap: [
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 29,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 23,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 23,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0, 31,  0,  0,  0,  0,  0,  0, 25,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 26,  0,  0,  0,  0,  0,  5,  1,  1],
    [ 0,  0,  0,  0,  0,  0, 25, 24, 26,  0,  0,  0,  0,  0, 25, 24, 26,  5,  1,  1],
    [29,  0,  0, 31, 31,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  1,  1],
    [23, 31, 31, 23, 23, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    [14, 14, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 27]
    ],
    solidTiles: {22:true, 23:true, 24:true, 25:true, 26:true, 29:true, 31:true, 32:true, 33:true},
    gravity: .12,
    gravityMax: 8
};
// handle the tile loading and creating our player object in preload before the game can start
function preload() {
    //load in images and animations
    bg = loadImage("images/bg.png");
    gameTitle = loadImage("images/gameTitle.png");
    menuButton = loadImage("images/menuButton.png");
    cloudD = loadImage("images/cloudD.png");
    cloudA = loadImage("images/cloudA.png");
    wizAni = loadAnimation("assets/wizzart_m_run_anim_f0.png","assets/wizzart_m_run_anim_f3.png");
    heartNull = loadImage("assets/heartNull.png");
    heartFull = loadImage("assets/heartFull.png");
    
    //load in audio files
    soundFormats("ogg","mp3");
    attSound = loadSound("sounds/attack.mp3");
    jumpSound = loadSound("sounds/jump.mp3");
    bgMusic = loadSound("sounds/bgMusic.mp3");
    loseSound = loadSound("sounds/lose.mp3");
    victorySound = loadSound("sounds/victory.mp3");
    clickSound = loadSound("sounds/click.mp3");
    clickSound.setVolume(.4);
    loseSound.setVolume(.3);
    
    //WORLD 1 
    theWorld1 = new ViewWorld(world1Parameters);
    thePlayer1 = new Player(100, 370, theWorld1);
    e1 = new Enemy1(400,390, theWorld1, thePlayer1);
    e2 = new Enemy1(600,390, theWorld1, thePlayer1);
    e3 = new Enemy1(750,390, theWorld1, thePlayer1);
    enemiesFirst.push(e1);
    enemiesFirst.push(e2);
    enemiesFirst.push(e3);
    door1 = new Door(thePlayer1, theWorld1);
    
    //WORLD 2
    theWorld2 = new ViewWorld(world2Parameters);
    thePlayer2 = new Player(50,310,theWorld2);
    door2 = new Door(thePlayer1, theWorld2);
    
    e21 = new Enemy1(600,390,theWorld2,thePlayer2);
    e22 = new Enemy2(260,390,theWorld2,thePlayer2);
    e23 = new Enemy2(300,290,theWorld2,thePlayer2);
    e24 = new Enemy2(350,290,theWorld2,thePlayer2);
    e25 = new Enemy1(330,190,theWorld2,thePlayer2);
    e26 = new Enemy2(500,240,theWorld2,thePlayer2);
    e27 = new Enemy2(550,240,theWorld2,thePlayer2);
    e28 = new Enemy1(540,390,theWorld2,thePlayer2);
    e29 = new Enemy1(460,390,theWorld2,thePlayer2);
    e30 = new Enemy1(420,390,theWorld2,thePlayer2);
    e31 = new Enemy1(720,340,theWorld2,thePlayer2);
    e32 = new Enemy1(730,190,theWorld2,thePlayer2);
    e33 = new Enemy1(670,340,theWorld2,thePlayer2);
    e34 = new Enemy2(850,140,theWorld2,thePlayer2);
    
    enemiesSecond.push(e21);
    enemiesSecond.push(e22);
    enemiesSecond.push(e23);
    enemiesSecond.push(e24);
    enemiesSecond.push(e25);
    enemiesSecond.push(e26);
    enemiesSecond.push(e27);
    enemiesSecond.push(e28);
    enemiesSecond.push(e29);
    enemiesSecond.push(e30);
    enemiesSecond.push(e31);
    enemiesSecond.push(e32);
    enemiesSecond.push(e33);
    enemiesSecond.push(e34);
    
    door2 = new Door(thePlayer2, theWorld2);
    
    //WORLD 3
    theWorld3 = new ViewWorld(world3Parameters);
    thePlayer3 = new Player(50,360,theWorld3);
    door3 = new Door(thePlayer3, theWorld3);

    e51 = new Enemy3(310,390,theWorld3,thePlayer3);
    e52 = new Enemy3(380,390,theWorld3,thePlayer3);
    e53 = new Enemy3(430,390,theWorld3,thePlayer3);
    e54 = new Enemy3(490,390,theWorld3,thePlayer3);
    e55 = new Enemy3(560,390,theWorld3,thePlayer3);
    e56 = new Enemy3(620,390,theWorld3,thePlayer3);
    e57 = new Enemy3(670,390,theWorld3,thePlayer3);
    e58 = new Enemy3(740,390,theWorld3,thePlayer3);
    e59 = new Enemy3(780,390,theWorld3,thePlayer3);
    e60 = new Enemy1(320,190,theWorld3,thePlayer3);
    e61 = new Enemy3(350,290,theWorld3,thePlayer3);
    e62 = new Enemy2(360,290,theWorld3,thePlayer3);
    e63 = new Enemy1(210,340,theWorld3,thePlayer3);
    e64 = new Enemy2(550,240,theWorld3,thePlayer3);
    e65 = new Enemy1(580,240,theWorld3,thePlayer3);
    e66 = new Enemy1(680,190,theWorld3,thePlayer3);
    e67 = new Enemy1(780,140,theWorld3,thePlayer3);
    e68 = new Enemy3(780,290,theWorld3,thePlayer3);
    e69 = new Enemy3(760,290,theWorld3,thePlayer3);
    
    enemiesThird.push(e51);
    enemiesThird.push(e52);
    enemiesThird.push(e53);
    enemiesThird.push(e54);
    enemiesThird.push(e55);
    enemiesThird.push(e56);
    enemiesThird.push(e57);
    enemiesThird.push(e58);
    enemiesThird.push(e59);
    enemiesThird.push(e60);
    enemiesThird.push(e61);
    enemiesThird.push(e62);
    enemiesThird.push(e63);
    enemiesThird.push(e64);
    enemiesThird.push(e65);
    enemiesThird.push(e66);
    enemiesThird.push(e67);
    enemiesThird.push(e68);
    enemiesThird.push(e69);
}

function setup() {
    //create and reparent the canvas to fit in the middle of the page
    theCanvas = createCanvas(500,500);
    theCanvas.style('display', 'block');
    theCanvas.style('margin', 'auto');
    theCanvas.parent('gameHere');
    fill(255);
    textFont("monospace");
    //give the clouds a random speed between 1.5 and 2
    cdSpeed = Math.random()*(2-1.5) + 1.5;
    caSpeed = Math.random()*(2-1.5) + 1.5;
    cdX = Math.random()*400 + 50;
    caX = Math.random()*400 + 50;
    bgMusic.setVolume(.5);
    bgMusic.play();
    bgMusic.loop(); 
}

function draw() {
    image(bg,0,0,width,height);
    //game states
    if(state == 0){
        menu();
    }
    else if(state == 1){
        game1();
    }
    else if(state == 2){
        game2();
    }
    else if(state == 3){
        game3();
    }
    else if(state == 4){
        victory();
    }
    else if(state == 5){
        loss();
    }
    //health and point section
    if(state == 1 || state == 2 || state == 3){
        textSize(20);
        textStyle(BOLD);
        text("Points: "+ points, 20, 30);
        text("Health: ", 20, 70);
    }
    noCursor();
    fill(0,0,255);
    noStroke();
    //custom blue circle cursor
    ellipse(mouseX,mouseY,10,10);
}

function menu(){
    image(gameTitle,50,150,420,70);
    image(menuButton,50,300,400,50);
    if(cdX<width){
        cdX += cdSpeed
    }
    else if(cdX>width){
        cdX = 0;
    }
    if(caX<width){
        caX += caSpeed
    }
    else if(caX>width){
        caX = 0;
    }
    image(cloudD,cdX,100);
    image(cloudA,caX,50);
    animation(wizAni,250,250);
}

function game1(){
    //display information for first world
    theWorld1.displayWorld();
    thePlayer1.move();
    thePlayer1.display();
    door1.display();
    
    //check if enemies are still alive
    for(var i = 0; i<enemiesFirst.length; i++){
        if(enemiesFirst[i].alive){
            enemiesFirst[i].display();
        }
        else if(enemiesFirst[i].alive == false){
            console.log(enemiesFirst[i]);
            enemiesFirst.splice(i,1);
        }
    }
    
    //check if attacks are still within set limits
    for(var i = 0; i<magicArr.length; i++){
        if(magicArr[i].alive){
            magicArr[i].display();
        }
        else if(magicArr[i].alive == false) {
            magicArr.splice(i,1);
        }
    }
}

function game2(){
    theWorld2.displayWorld();
    thePlayer2.move();
    thePlayer2.display();
    door2.display();
    
    for(var i = 0; i<enemiesSecond.length; i++){
        if(enemiesSecond[i].alive){
            enemiesSecond[i].display();
        }
        else if(enemiesSecond[i].alive == false){
            console.log(enemiesSecond[i]);
            enemiesSecond.splice(i,1);
        }
    }
    
    for(var i = 0; i<magicArr.length; i++){
        if(magicArr[i].alive){
            magicArr[i].display();
        }
        else if(magicArr[i].alive == false) {
            magicArr.splice(i,1);
        }
    }
}

function game3(){
    theWorld3.displayWorld();
    thePlayer3.move();
    thePlayer3.display();
    door3.display();
    
    for(var i = 0; i<enemiesThird.length; i++){
        if(enemiesThird[i].alive){
            enemiesThird[i].display();
        }
        else if(enemiesThird[i].alive == false){
            console.log(enemiesThird[i]);
            enemiesThird.splice(i,1);
        }
    }
    
    for(var i = 0; i<magicArr.length; i++){
        if(magicArr[i].alive){
            magicArr[i].display();
        }
        else if(magicArr[i].alive == false) {
            magicArr.splice(i,1);
        }
    }
}

//after 3rd map has been completed
function victory(){
    image(bg,0,0,width,height);
    textSize(50);
    textStyle(BOLD);
    text("FINAL SCORE", 100, 200);
    text(points,220,255);
    
    textSize(20);
    textStyle(NORMAL);
    text("Click anywhere to restart!", 100,400);
}

//if 2 lives are lost
function loss(){
    background(0);
    textSize(50);
    textStyle(BOLD);
    text("GAME OVER", 120, 100);
    
    textSize(30);
    text("FINAL SCORE",150,200);
    text(points,220,255);
    
    textSize(20);
    textStyle(NORMAL);
    text("Click anywhere to restart!", 100,400);
}

function keyPressed(){
    //attack when P or p is pressed
    if(keyCode == 80 || keyCode == 112){
        if(state == 1){
            var m = new Magic(thePlayer1, theWorld1, enemiesFirst);
            magicArr.push(m);
            attSound.play();
        }
        else if(state == 2){
            var m = new Magic(thePlayer2, theWorld2, enemiesSecond);
            magicArr.push(m);
            attSound.play();
        }
        else if(state == 3){
            var m = new Magic(thePlayer3, theWorld3, enemiesThird);
            magicArr.push(m);
            attSound.play();
        }
    }
}

function mousePressed(){
    //click areas for the button
    if(state == 0){
        if(mouseX>50 && mouseX<450 && mouseY>300 && mouseY<350){
            state += 1;
            clickSound.play();
        }
    }
    else if(state == 4 || state == 5){
        resetter();
        clickSound.play();
    }
}

function resetter(){
    //reset array and any other values necessary
    enemiesFirst = [];
    enemiesSecond = [];
    enemiesThird = [];
    magicArr = [];
    state = 0;
    points = 0;
    hp = 2;
    cdSpeed = Math.random()*(2-1.5) + 1.5;
    caSpeed = Math.random()*(2-1.5) + 1.5;
    cdX = Math.random()*400 + 50;
    caX = Math.random()*400 + 50;
    //WORLD 1 
    theWorld1 = new ViewWorld(world1Parameters);
    thePlayer1 = new Player(100, 370, theWorld1);
    e1 = new Enemy1(400,390, theWorld1, thePlayer1);
    e2 = new Enemy1(600,390, theWorld1, thePlayer1);
    e3 = new Enemy1(750,390, theWorld1, thePlayer1);
    enemiesFirst.push(e1);
    enemiesFirst.push(e2);
    enemiesFirst.push(e3);
    door1 = new Door(thePlayer1, theWorld1);
    
    //WORLD 2
    theWorld2 = new ViewWorld(world2Parameters);
    thePlayer2 = new Player(50,310,theWorld2);
    door2 = new Door(thePlayer1, theWorld2);
    
    e21 = new Enemy1(600,390,theWorld2,thePlayer2);
    e22 = new Enemy2(260,390,theWorld2,thePlayer2);
    e23 = new Enemy2(300,290,theWorld2,thePlayer2);
    e24 = new Enemy2(350,290,theWorld2,thePlayer2);
    e25 = new Enemy1(330,190,theWorld2,thePlayer2);
    e26 = new Enemy2(500,240,theWorld2,thePlayer2);
    e27 = new Enemy2(550,240,theWorld2,thePlayer2);
    e28 = new Enemy1(540,390,theWorld2,thePlayer2);
    e29 = new Enemy1(460,390,theWorld2,thePlayer2);
    e30 = new Enemy1(420,390,theWorld2,thePlayer2);
    e31 = new Enemy1(720,340,theWorld2,thePlayer2);
    e32 = new Enemy1(730,190,theWorld2,thePlayer2);
    e33 = new Enemy1(670,340,theWorld2,thePlayer2);
    e34 = new Enemy2(850,140,theWorld2,thePlayer2);
    
    enemiesSecond.push(e21);
    enemiesSecond.push(e22);
    enemiesSecond.push(e23);
    enemiesSecond.push(e24);
    enemiesSecond.push(e25);
    enemiesSecond.push(e26);
    enemiesSecond.push(e27);
    enemiesSecond.push(e28);
    enemiesSecond.push(e29);
    enemiesSecond.push(e30);
    enemiesSecond.push(e31);
    enemiesSecond.push(e32);
    enemiesSecond.push(e33);
    enemiesSecond.push(e34);
    
    door2 = new Door(thePlayer2, theWorld2);
    
    //WORLD 3
    theWorld3 = new ViewWorld(world3Parameters);
    thePlayer3 = new Player(50,360,theWorld3);
    door3 = new Door(thePlayer3, theWorld3);

    e51 = new Enemy3(310,390,theWorld3,thePlayer3);
    e52 = new Enemy3(380,390,theWorld3,thePlayer3);
    e53 = new Enemy3(430,390,theWorld3,thePlayer3);
    e54 = new Enemy3(490,390,theWorld3,thePlayer3);
    e55 = new Enemy3(560,390,theWorld3,thePlayer3);
    e56 = new Enemy3(620,390,theWorld3,thePlayer3);
    e57 = new Enemy3(670,390,theWorld3,thePlayer3);
    e58 = new Enemy3(740,390,theWorld3,thePlayer3);
    e59 = new Enemy3(780,390,theWorld3,thePlayer3);
    e60 = new Enemy1(320,190,theWorld3,thePlayer3);
    e61 = new Enemy3(350,290,theWorld3,thePlayer3);
    e62 = new Enemy2(360,290,theWorld3,thePlayer3);
    e63 = new Enemy1(210,340,theWorld3,thePlayer3);
    e64 = new Enemy2(550,240,theWorld3,thePlayer3);
    e65 = new Enemy1(580,240,theWorld3,thePlayer3);
    e66 = new Enemy1(680,190,theWorld3,thePlayer3);
    e67 = new Enemy1(780,140,theWorld3,thePlayer3);
    e68 = new Enemy3(780,290,theWorld3,thePlayer3);
    e69 = new Enemy3(760,290,theWorld3,thePlayer3);
    
    enemiesThird.push(e51);
    enemiesThird.push(e52);
    enemiesThird.push(e53);
    enemiesThird.push(e54);
    enemiesThird.push(e55);
    enemiesThird.push(e56);
    enemiesThird.push(e57);
    enemiesThird.push(e58);
    enemiesThird.push(e59);
    enemiesThird.push(e60);
    enemiesThird.push(e61);
    enemiesThird.push(e62);
    enemiesThird.push(e63);
    enemiesThird.push(e64);
    enemiesThird.push(e65);
    enemiesThird.push(e66);
    enemiesThird.push(e67);
    enemiesThird.push(e68);
    enemiesThird.push(e69);
}
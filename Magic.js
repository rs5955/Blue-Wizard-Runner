//Magic object (the player's attack)
function Magic(player, world, enemyArr){
    this.player = player;
    this.world = world;
    this.im = loadImage("assets/flask.png");
    this.x = player.x;
    this.y = player.y;
    this.speed = 7;
    this.alive = true;
    this.dir = player.dir;
    
    this.display = function(){
        //base the projectile direction based on the player
        if(this.alive){
            if(this.dir == "R"){
                this.x += this.speed;
            }
            else{
                this.x -= this.speed;
            }
            image(this.im,this.x,this.y,20,20);
        }
        //kill the object if it reaches the end of the screen
        if(this.x>width || this.x<0){
            this.alive = false;
        }
        //check the enemy array to see if the object has come in contact with any enemy
        for(var i=0; i<enemyArr.length; i++){
            if(this.x > enemyArr[i].xPos+world.offsetX-45 
               && this.x < enemyArr[i].xPos+world.offsetX+10
              && this.y > enemyArr[i].yPos-40 && this.y < enemyArr[i].yPos){
                this.alive = false;
                enemyArr[i].alive = false;
                points += 2;
            }
        }
    }
}
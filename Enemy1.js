function Enemy1(x,y,world,player){
    //set the position variables for the enemy
    this.xPos = x;
    this.yPos = y;
    //load the animation files
    this.im = loadAnimation("assets/big_demon_idle_anim_f0.png","assets/big_demon_idle_anim_f3.png");
    this.alive = true;
    
    //display function for first enemy
    this.display = function(){
        //check if enemy is alive
        if(this.alive){
            //keep enemy in relation to world offset ()
            push();
            translate(world.offsetX,world.offsetY);
            animation(this.im,this.xPos,this.yPos);
            pop();
            //check if player is near this enemy object
            if(player.x > this.xPos+world.offsetX-45 && player.x < this.xPos+world.offsetX+10
              && player.y < this.yPos+world.offsetY+20 && player.y > this.yPos+world.offsetY-20){
                console.log("HIT");//see if player has hit this object
                this.alive = false;//kill this object
                hp -= 1; //decrease player hp by 1
                console.log(hp); //check if hp has decreased
            }
        }
    }
}
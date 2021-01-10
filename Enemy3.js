function Enemy3(x,y,world,player){
    //set hte position of the enemy
    this.xPos = x;
    this.yPos = y;
    //this.speed = .75;
    this.speed = Math.random()*(2-1.5) + 1.5;
    this.im1 = loadAnimation("assets/knight_m_run_anim_f0.png","assets/knight_m_run_anim_f3.png");
    this.im2 = loadAnimation("assets/rknight_m_run_anim_f0.png","assets/rknight_m_run_anim_f3.png");
    this.alive = true;
    this.sgn = [-1,1];
    this.speed = this.sgn[Math.floor(Math.random()*this.sgn.length)]*this.speed;
    
    //update the image
    if(this.speed < 0){
        this.im = this.im2;
    }
    else if(this.speed >0){
        this.im = this.im1;
    }
        
    this.display = function(){
        if(this.alive){
            //move the object
            this.xPos += this.speed;
            if((this.xPos - x)>40){
                this.speed *= -1;
                this.im = this.im2;
            }
            else if((this.xPos - x)<-40){
                this.speed *= -1;
                this.im = this.im1;
            }
            //keep the object within the world parameters
            push();
            translate(world.offsetX,world.offsetY);
            animation(this.im,this.xPos,this.yPos);
            pop();
            if(player.x > this.xPos+world.offsetX-45 && player.x < this.xPos+world.offsetX+10
              && player.y < this.yPos+world.offsetY+20 && player.y > this.yPos+world.offsetY-20){
                console.log("HIT");//check that the object has been hit
                this.alive = false;//kill the object
                hp -= 1; //decrease the player health by 1
                console.log(hp); //check for player health
            }
        }
    }
}
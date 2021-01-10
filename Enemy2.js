function Enemy2(x,y,world,player){
    //set default position of enemy 
    this.xPos = x;
    this.yPos = y;
    //random speed between .85 and .45
    this.speed = Math.random()*(.85-.45) + .45; //random speed between .85 and .45
    //set the animation for the object using play.js
    this.im1 = loadAnimation("assets/big_zombie_run_anim_f0.png","assets/big_zombie_run_anim_f3.png");
    this.im2 = loadAnimation("assets/rbig_zombie_run_anim_f0.png","assets/rbig_zombie_run_anim_f3.png");
    this.alive = true;
    //randomize the object direction
    this.sgn = [-1,1];
    this.speed = this.sgn[Math.floor(Math.random()*this.sgn.length)]*this.speed;
    
    //update the image orientation 
    if(this.speed < 0){
        this.im = this.im2;
    }
    else if(this.speed >0){
        this.im = this.im1;
    }
        
    this.display = function(){
        //while this object is alive (and not in contact with the player)
        if(this.alive){
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
                console.log("HIT");//check if object has contacted a playe
                this.alive = false;
                hp -= 1; //decrease player hp by 1
                console.log(hp);
            }
        }
    }
}
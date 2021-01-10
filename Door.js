//Door object
function Door(player, world){
    //set the image of the object
    this.im = loadImage("assets/door.png");
    
    this.display = function(){
        //draw the door near the right edge of the map
        image(this.im,900+world.offsetX,355+world.offsetY,50,50);
        //update door position based on world offset
        if(player.x > 875+world.offsetX && player.x < 950+world.offsetX && player.y > 355){
            points += 5; //add 5 points for entering door
            state += 1; //change state to next level
            victorySound.setVolume(.2); //lower volume
            victorySound.play(); //play door entering sound
        }
    }
    
    
}
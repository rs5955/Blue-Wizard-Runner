//most of this is from the sample code
function ViewWorld(params) {
  // store our desired tile size
  this.tileSize = params.tileSize;
  
  // store our tile map
  this.tileMap = params.tileMap;

  // store the folder in which all of our tiles are stored
  this.tileFolder = params.tileFolder;
  
  // store how many tiles we are working with
  this.numTiles = params.numTiles;
  
  // store an object that defines which tiles are solid
  this.solidTiles = params.solidTiles;

  // an array to hold all tile graphics
  this.tileLibrary = [];
  
  // store gravity information
  this.gravity = params.gravity;
  this.gravityMax = params.gravityMax;

  // offset values - we will use this to "slide" the world left and right
  // around the character
  this.offsetX = 0;
  this.offsetY = 0;

  // load in all tile graphics
  for (var i = 0; i < this.numTiles; i++) {
    var tempTile = loadImage(this.tileFolder + "/" + i + ".png");
    this.tileLibrary.push(tempTile);
  }

  // displayTile: draws a single tile at a specified location
  this.displayTile = function(id, x, y) {
    image(this.tileLibrary[id], x, y);
  }

  // displayWorld: displays the current world
  this.displayWorld = function() {
    push();
    translate(this.offsetX, this.offsetY);
    for (var row = 0; row < this.tileMap.length; row += 1) {
      for (var col = 0; col < this.tileMap[row].length; col += 1) {
          if(this.tileMap[row][col] != 0){
            image(this.tileLibrary[ this.tileMap[row][col] ], col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
          }
      }
    }
    pop();
  }
  
  // requestSlide: slides the world around the player (for scrolling purposes)
  this.requestSlide = function(direction, playerX, playerY, speed) {
    
    if (direction == "left") {

      // no need to slide if the player is on the left side of the screen
      if (playerX < width/2) {
        return false;
      }

      // compute the x position of the right-most tile in our level
      var rightMostX = this.tileMap[0].length * this.tileSize + this.offsetX;
      
      // if that position is off the right edge of the screen then we need to slide
      if (rightMostX > width) {
        this.offsetX -= speed;
        return true;
      }
      
      // otherwise we have reached the end of the world - no more sliding
      return false;
    }

    if (direction == "right") {

      // no need to slide if the player is on the right side of the screen
      if (playerX > width/2) {
        return false;
      }

      // compute the x position of the left-most tile in our level
      var leftMostX = 0 + this.offsetX;
      
      // if that position is off the left edge of the screen then we need to slide
      if (leftMostX < 0) {
        this.offsetX += speed;
        return true;
      }
      
      // otherwise we have reached the end of the world - no more sliding
      return false;
    }  
    
    return false;
  }
  
  // get a tile based on a screen x,y position
  this.getTile = function(x, y) {
    // convert the x & y position into a grid position
    var col = Math.floor( (x-this.offsetX) / this.tileSize);
    var row = Math.floor( (y-this.offsetY) / this.tileSize);
    
    // if the computed position is not in the array we can send back a -1 value
    if (row < 0 || row >= this.tileMap.length || col < 0 || col >= this.tileMap[row].length) {
      return -1;
    }

    // get the tile from our map
    return this.tileMap[row][col];
  }
  
  // see if this tile is solid
  this.isTileSolid = function(id) {
    if (id in this.solidTiles || id == -1) {
      return true;
    }
    
    // otherwise return false
    return false;
  }
}
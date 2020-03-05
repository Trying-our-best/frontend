//character class keeps track of charcter's current tile position, destination tile
//time at which movement began to dest tile, dimensions of chatacter in pixels
// the exact position of the character relative to top left corner of map in px
//delay move is time it will take character to move exactly 1 time in ms
//char class has a placeAt method - this method wil immed place character at destinaiton tile, takes 2 args, the x and y position where to place the character

function Character() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    this.dimensions = [30, 30]
    this.position = [45, 45]
    this.delayMove = 700
 
 }
 
 //context stores 2d context of canvas el itself
 let ctx = null;
 //tile width and height of each tile drawn to map in px
 let tileW = 40, tileH = 40
 //map width and height in tiles
 let mapW = 10, mapH = 10
 
 //track frame rate
 let currentSecond = 0, frameCount = 0, frameLastSecond = 0
 //keeps track of time
 let lastFrameTime = 0
 //maps the event codes of arrow keys on keyboard to boolean flags for whether or not the key is currently pressed down, to being all values are false 
 let keysDown = {
    37: false, //left
    38: false, //down 
    39: false, //right
    40: false //up
 }
 
 //player will be a new instance of the Character class we will create in a moment
 //allows us to create new chracters if needed
 let player = new Character()
 
 
 
 //array stores all map tiles which will make up our map
 //0 is not passable, 1 is passable
 //we've laid map out in columns and rows corresponding to how they will appear on map itself
 let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 ]
 
 
 Character.prototype.placeAt = function (x, y) {
    this.tileFrom = [x, y]
    this.tileTo = [x, y]
    //calc x and y pixel postion of character by multiplying width of  atile by x value
    //and to this we add width of tile subtracting the character's width and divinng this by 2
    //similarly for y
    this.position = [((tileW * x) + (tileW - this.dimensions[0]) / 2), ((tileH * y) + (tileH - this.dimensions[1]) / 2)]
 
 }
 
 //add process movement method for character object
 //this takes 1 arg, time elapsed currently in game t, it will return either t or f depending on whether it's had to do processing
 //if movement is ongoing, return true, however if character is not moving at allr eturn false
 Character.prototype.processMovement = function (t) {
    //return either true or false depending on whether or not it's had to do any processing if movement is oongoing, it returns true, if not moving it returns false
    //inside the method, if ew check and see if destination tile, tile 2 is diff than current tile tileFrom, if either x or y values of tileto or tilefrom are diff, we know the character is currently moving
    //if however both the same, we know character is currently at its destination tile in which case no movement processing needed to be doe
    if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
        return false
    }
    //if we determined character is moving, check to see amount of time elapsed since character began movement is greater than or equal to time it takes character to move one tile
    if ((t - this.timeMoved) >= this.delayMove) {
        //if true, we know character shouldve reached destination time
        this.placeAt(this.tileTo[0], this.tileTo[1])
    } else {
        //calc pixel positions of character at starting tile, tile from. Let's modify these based on which dimension the character is moving, horizontally or vertically
        this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2)
        this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2)
 
        //HORIZONTAL
 
        //if true, move horizontaly, diff is distance moved in px between current and destination x values
        //calculate it by dividing tileW by how long it takes to move and muliplty by amount time has passed
        if (this.tileTo[0] != this.tileFrom[0]) {
            let diff = (tileW / this.delayMove) * (t - this.timeMoved);
            //x value postion PLUS and then see if destionation tile is to left or right of cur positoin
            // if tile 
            this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff)
        }
        //VERTICAL
        if (this.tileTo[1] != this.tileFrom[1]) {
            let diff = (tileH / this.delayMove) * (t - this.timeMoved)
            //add or subtract from vertical y position
            this.position[1] = (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff)
        }
 
        //After calc, round postiion values to nearest tile number
        this.position = Math.round(this.position[0])
        this.position = Math.round(this.position[1])
    }
    //if we get this far, movement has happened.
    return true;
 
 }
 
 
 //helper function toIndex,takes 2 args, x and y and return corresponding game map array index
 function toIndex(x, y) {
    //y * map width and add x 
    return ((y * mapW) + x)
 }
 
 
 //function handles load event
 window.onload = function () {
    ctx = document.getElementById('game').getContext('2d')
    //when its ready for us to begin drawing to canvas, we'll handle with drawGamefunction
    requestAnimationFrame(drawGame)
    ctx.font = 'bold 10pt sans-serif'
 
    //add additional event to window onload function
    //keydown occurs whenever a button is pressed down
    window.addEventListener('keydown', function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            //update keys down map
            keysDown[e.keyCode] = true
        }
 
    })
    //occurs when a key is released
    window.addEventListener('keyup', function (e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            //update keys down map to false
            keysDown[e.keyCode] = false
        }
    })
 
 
 }
 
 
 
 //draw game function
 export default function drawGame() {
    //is ctx variable null? if so, leave
    if (ctx == null) {
        return
    }
    //curent time in ms
    let currentFrameTime = Date.now()
    //elapsed time since last frame time in ms
    let timeElapsed = currentFrameTime - lastFrameTime
    let framesLastSecond;
    //calc cur sec, used to keep track of fraame rate in game
    let sec = Math.floor(Date.now() / 1000)
    //if sec is not equal to currentSecond
    // then we update currentSec accordingly and frame count for frame count's last sec will be assigned
    if (sec != currentSecond) {
        currentSecond = sec;
        let framesLastSecond = frameCount;
        frameCount = 1;
    } else {
        //increase frame count
        frameCount++;
    }
    //Y AXIS MOVEMENT
 
    //after calc for frame rate, check to see if player is processing any movement
    if (!player.processMovement(currentFrameTime)) {
        //if true, 
 
 
        //Y AXIS MOVEMENT
        if (keysDown[38] && player.tileFrom[1] > 0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] - 1)] == 1) { player.tileTo[1] -= 1; }
        else if (keysDown[40] && player.tileFrom[1] < (mapH - 1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] + 1)] == 1) { player.tileTo[1] += 1; }
 
        //X AXIS MOVEMENT
        else if (keysDown[37] && player.tileFrom[0] > 0 && gameMap[toIndex(player.tileFrom[0] - 1, player.tileFrom[1])] == 1) { player.tileTo[0] -= 1; }
        else if (keysDown[39] && player.tileFrom[0] < (mapW - 1) && gameMap[toIndex(player.tileFrom[0] + 1, player.tileFrom[1])] == 1) { player.tileTo[0] += 1; }
 
        //after checking for arrow keys being pressed to process new movement
        //check to see if tile 1 values are same as tile 2
        if (player.tileFrom[0] != player.tileTo[0] || player.tileFrom[1] != player.tileTo[1]) { player.timeMoved = currentFrameTime; }
 
 
    }
 
 
 
    //draw tiles that make up game map
    //beign by looping through each tile
    for (let y = 0; y < mapH; y++) {
        //for each row, go left to right 
        for (let x = 0; x < mapW; x++) {
            //switch statement lets us choose which color to draw curent tile with
            //find value at corresponding game map index by y*mapW and add x
            switch (gameMap[((y * mapW) + x)]) {
                case 0:
                    ctx.fillStyle = "#999999";
                    break;
                default:
                    ctx.fillStyle = "#eeeeee"
            }
            //draw rectangle at coresponding position tile
            ctx.fillRect(x * tileW, y * tileH, tileW, tileH)
 
        }
    }
 
    ctx.fillStyle = "#0000ff"
    ctx.fillRect(player.position[0], player.position[1], player.dimensions[1], player.dimensions[1]);
 
    //finally set fill style to bright red
    ctx.fillStyle = "#ff0000"
    //draw current frame rate
    ctx.fillText("FPS: " + framesLastSecond, 10, 20)
 
 
    lastFrameTime = currentFrameTime;
 
    //when ready to draw another animation to canvas, draw this again
    requestAnimationFrame(drawGame)
 }
 
 
 
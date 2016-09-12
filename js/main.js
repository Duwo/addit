try {
  var GameSession = require('./app/GameSession.js');
  var helper = require('./lib/helper.js')
}
catch(err) {
  console.log(err)
}

var dragging = false;
var activePart;

$("document").ready(function() {GameSession.init()});

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    GameSession.update();
}

function mouseDownListener(evt) {
    //We are going to pay attention to the layering 
    //order of the objects so that if a mouse down occurs over more than object,
    //only the topmost one will be dragged. 
    mouseX = (evt.clientX - GameSession.bRect.left)*(GameSession.canvas.width/GameSession.bRect.width);
    mouseY = (evt.clientY - GameSession.bRect.top)*(GameSession.canvas.height/GameSession.bRect.height);
    dragging = false;
    GameSession.canvas.addEventListener("mouseup", mouseUpListener, false);
    for (i in GameSession.parts) {
        if (helper.hitTest(GameSession.parts[i], mouseX, mouseY)) {
            dragging = true;
            //We will pay attention to the point on the object where the mouse is "holding" the object:
            dragHoldX = mouseX - GameSession.parts[i].posx;
            dragHoldY = mouseY - GameSession.parts[i].posy;
            activePart = GameSession.parts[i];
        }
    }
    if (dragging) {
        GameSession.canvas.addEventListener("mousemove", mouseMoveListener, false);
    }
}

function mouseUpListener(evt) { 
    mouseX = (evt.clientX - GameSession.bRect.left)*(GameSession.canvas.width/GameSession.bRect.width);
    mouseY = (evt.clientY - GameSession.bRect.top)*(GameSession.canvas.height/GameSession.bRect.height);
    GameSession.canvas.removeEventListener("mouseup", mouseUpListener, false);
    GameSession.canvas.addEventListener("mousedown", mouseDownListener, false);
    
    if (!helper.contains(GameSession.target.parts, activePart)) {
        activePart.sign = ''
    };
    activePart = 0;
    if (dragging) {
        dragging = false;
        GameSession.canvas.removeEventListener("mousemove", mouseMoveListener, false);
    }
    GameSession.update();
    GameSession.completed();
};

function mouseMoveListener(evt) {
    if (dragging) {
        if (helper.hitTest(GameSession.target, mouseX, mouseY) 
            && !helper.contains(GameSession.target.parts, activePart)) {
            GameSession.target.includePart(activePart, GameSession.sign);
        } else if (!helper.hitTest(GameSession.target, mouseX,mouseY) 
            && helper.contains(GameSession.target.parts, activePart)) {
            GameSession.target.excludePart(activePart);
        };        
    };
    partRad = activePart.radius;
    minX = partRad;
    maxX = GameSession.canvas.width - partRad;
    minY = partRad;
    maxY = GameSession.canvas.height - partRad;
    //getting mouse position correctly 
    mouseX = (evt.clientX - GameSession.bRect.left)*(GameSession.canvas.width/GameSession.bRect.width);
    mouseY = (evt.clientY - GameSession.bRect.top)*(GameSession.canvas.height/GameSession.bRect.height);
        
    //clamp x and y positions to prevent object from dragging outside of GameSession.canvas
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    activePart.posx = posX;
    activePart.posy = posY;
    activePart.sign = GameSession.sign
    GameSession.update();
};

/*
$('#myCanvas').on('mousedown', function(e){

    if (isDown === false) {
        console.log("hellllo")
        isDown = true;

        var pos = getMousePos(GameSession.canvas, e);
        x1 = pos.x;
        y1 = pos.y;
    }
});
// when mouse button is released (note: window, not GameSession.canvas here)
$(window).on('mouseup', function(e){
    if (isDown === true) {

        var pos = getMousePos(GameSession.canvas, e);
        x2 = pos.x;
        y2 = pos.y;

        isDown = false;

        //we got two sets of coords, process them
        alert(x1 + ',' + y1 + ',' +x2 + ',' +y2);
    }
});

// get mouse pos relative to GameSession.canvas (yours is fine, this is just different)
function getMousePos(GameSession.canvas, evt) {
    var rect = GameSession.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
*/
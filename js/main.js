try {
  var GameSession = require('./app/GameSession.js');
}
catch(err) {
  console.log(err)
}

var canvas  = document.getElementById("myCanvas")
var context = canvas.getContext("2d");
var bRect   = canvas.getBoundingClientRect();

var dragging = false;
var activePart;
document.getElementById("body").onload = function() {GameSession.init()};

canvas.addEventListener("mousedown", mouseDownListener, false);
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    canvas.addEventListener("mousedown", mouseDownListener, false);
    context = canvas.getContext("2d");
    bRect   = canvas.getBoundingClientRect();
    GameSession.update();
}

function mouseDownListener(evt) {
    //We are going to pay attention to the layering 
    //order of the objects so that if a mouse down occurs over more than object,
    //only the topmost one will be dragged. 
    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
    dragging = false;
    canvas.addEventListener("mouseup", mouseUpListener, false);
    for (var i in GameSession.parts) {
        if (hitTest(GameSession.parts[i], mouseX, mouseY)) {
            dragging = true;
            //We will pay attention to the point on the object where the mouse is "holding" the object:
            dragHoldX = mouseX - GameSession.parts[i].posx;
            dragHoldY = mouseY - GameSession.parts[i].posy;
            activePart = GameSession.parts[i];
        }
    }
    if (dragging) {
        canvas.addEventListener("mousemove", mouseMoveListener, false);
    }
}

function contains(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function mouseUpListener(evt) { 
    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
    canvas.removeEventListener("mouseup", mouseUpListener, false);
    canvas.addEventListener("mousedown", mouseDownListener, false);
    if (dragging) {
        if (hitTest(GameSession.target, mouseX, mouseY) 
            && !contains(GameSession.target.parts, activePart)) {
            GameSession.target.includePart(activePart, GameSession.sign);
        } else if (!hitTest(GameSession.target, mouseX,mouseY) 
            && contains(GameSession.target.parts, activePart)) {
            GameSession.target.excludePart(activePart);
        };        
    };
    if (dragging) {
        dragging = false;
        canvas.removeEventListener("mousemove", mouseMoveListener, false);
    }
    GameSession.update();
};


function mouseMoveListener(evt) {
    partRad = activePart.radius;
    minX = partRad;
    maxX = canvas.width - partRad;
    minY = partRad;
    maxY = canvas.height - partRad;
    //getting mouse position correctly 
    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
        
    //clamp x and y positions to prevent object from dragging outside of canvas
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    activePart.posx = posX;
    activePart.posy = posY;
    GameSession.update();
};


/*
$('#myCanvas').on('mousedown', function(e){

    if (isDown === false) {
        console.log("hellllo")
        isDown = true;

        var pos = getMousePos(canvas, e);
        x1 = pos.x;
        y1 = pos.y;
    }
});
// when mouse button is released (note: window, not canvas here)
$(window).on('mouseup', function(e){
    if (isDown === true) {

        var pos = getMousePos(canvas, e);
        x2 = pos.x;
        y2 = pos.y;

        isDown = false;

        //we got two sets of coords, process them
        alert(x1 + ',' + y1 + ',' +x2 + ',' +y2);
    }
});

// get mouse pos relative to canvas (yours is fine, this is just different)
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
*/
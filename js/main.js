try {
  var GameSession = require('./app/GameSession.js');
}
catch(err) {
  console.log(err)
}

var canvas = document.getElementById("myCanvas")
var context = canvas.getContext("2d");
var bRect       = canvas.getBoundingClientRect();

var dragging;
var dragIndex;
var isDown = false;

var x1;
document.getElementById("body").onload = function() {GameSession.init()};
canvas.addEventListener("mousedown", mouseDownListener, false);


function mouseDownListener(evt) {
    console.log("xdsd")
    var i;
    //We are going to pay attention to the layering 
    //order of the objects so that if a mouse down occurs over more than object,
    //only the topmost one will be dragged. 
    var highestIndex = -1;
    dragIndex = -1;

    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
    dragging = false;
    canvas.addEventListener("mousedown", mouseUpListener, false);
    for (i=0; i < GameSession.parts.length; i++) {
        if  (hitTest(GameSession.parts[i], mouseX, mouseY)) {
            console.log("hello")
            dragging = true;
            if (i > highestIndex) {
                //We will pay attention to the point on the object where the mouse is "holding" the object:
                dragHoldX = mouseX - GameSession.parts[i].posx;
                dragHoldY = mouseY - GameSession.parts[i].posy;
                highestIndex = i;
                dragIndex = i;
            }
        }
    }
    
    if (dragging) {
        canvas.addEventListener("mousemove", mouseMoveListener, false);
    }
}

function mouseUpListener(evt) {

    console.log("hehe2")
    console.log(dragging)
    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
    canvas.removeEventListener("mouseup", mouseUpListener, false);
    canvas.addEventListener("mousedown", mouseDownListener, false);
    if (dragIndex >= 0){
        if (hitTest(GameSession.target, mouseX, mouseY) && (GameSession.target.partIds.indexOf(GameSession.parts[dragIndex].id) < 0)) {
            GameSession.target.includePart(GameSession.parts[dragIndex], GameSession.sign);
            GameSession.update();
        } else if ( dragging === true && hitTest(GameSession.target, mouseX,mouseY) === false && (GameSession.target.partIds.indexOf(GameSession.parts[dragIndex].id) > -1)) {
            GameSession.target.excludePart(GameSession.parts[dragIndex]);
            GameSession.update();
        };
    };
    if (dragging) {
        dragging = false;
        canvas.removeEventListener("mousemove", mouseMoveListener, false);
    }
};


function mouseMoveListener(evt) {
    var posX;
    var posY;
    var partRad = GameSession.parts[dragIndex].radius;
    var minX = partRad;
    var maxX = canvas.width - partRad;
    var minY = partRad;
    var maxY = canvas.height - partRad;
    //getting mouse position correctly 
    var bRect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);
        
    //clamp x and y positions to prevent object from dragging outside of canvas
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
        
    GameSession.parts[dragIndex].posx = posX;
    GameSession.parts[dragIndex].posy = posY;
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
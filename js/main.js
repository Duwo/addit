try {
  require('./app/View.js');
  var GameSession = require('./app/GameSession.js');
  var helper = require('./lib/helper.js')
}
catch(err) {
  console.log(err)
}

var dragging = false;
var activePart;
var mouse;

// Get Dom element for pure javascript
var canvas = $('#myCanvas')[0]

$("document").ready(function() {GameSession.init(canvas)});

canvas.addEventListener("mousedown", mouseDownListener, false);
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    GameSession.update();
}
$(window).scroll(function() {
    GameSession.update()
});


function mouseDownListener(evt) {
    console.log('MouseEvent:'+helper.convertMouse(evt, canvas))
    console.log('PartX:'+ GameSession.parts[0].posx)
    console.log('PartY:'+ GameSession.parts[0].posy)

    //We are going to pay attention to the layering 
    //order of the objects so that if a mouse down occurs over more than object,
    //only the topmost one will be dragged. 
    var mouse = helper.convertMouse(evt, canvas);
    mouseX = mouse[0]
    mouseY = mouse[1]
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
    var mouse = helper.convertMouse(evt, canvas);
    mouseX = mouse[0]
    mouseY = mouse[1]
    GameSession.canvas.removeEventListener("mouseup", mouseUpListener, false);
    GameSession.canvas.addEventListener("mousedown", mouseDownListener, false);
    
    if (activePart && !helper.contains(GameSession.target.parts, activePart)) {
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
    //getting mouse position correctly
    var mouse = helper.convertMouse(evt, canvas);
    mouseX = mouse[0]
    mouseY = mouse[1]

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
    //clamp x and y positions to prevent object from dragging outside of GameSession.canvas
    posX = mouseX;
    console.log('MouseX' + mouseX)
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    console.log('posX' + posX)

    posY = mouseY;
    
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    activePart.posx = posX;
    activePart.posy = posY;
    activePart.sign = GameSession.sign || ''
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
try {
  var Part = require('./Part.js');
  var Target = require('./Target.js');
}
catch(err) {
  console.log(err)
}

var idCounter = 0;

var GameSession = function() {
    var theCanvas   = document.getElementById("myCanvas");
    var bRect       = theCanvas.getBoundingClientRect();
    var number_of_parts;
    var parts;
    var target;
    var context     = theCanvas.getContext("2d");
    var dragging;
    var dragIndex;
    var dragHoldX;
    var dragHoldY;
    var level       = 0;
    this.sign;

    this.switch_sign = function (sign) {
        this.sign = sign
    }

    this.init = function() {
        parts = [];
        level++;
        var sumParts = 1;
        for (var i=0;i<level;i++) {
            var partValue = Math.floor((Math.random() * 10) + 1)
            sign = Math.round(Math.random() * 2)
            if (sign === 0) {
                console.log("+")
                console.log(partValue)
                sumParts += partValue
            } else if (sign === 1){
                console.log("-")
                console.log(partValue)
                sumParts -= partValue
            } else if (sign === 2) {
                console.log("*")
                console.log(partValue)
                sumParts *= partValue
            }
            parts[i]     = new Part(partValue);
        };

        //parts[level-1] = new Part(offSet - sumParts);
        target = new Target(sumParts)
        target.draw(); 
        drawParts();
    };

    this.update = function() {
        // Draw all parts

        // Check if click is inside target and recalculate
    
        // Check if target is completed
    };

    this.reset = function() {
        idCounter = 0;
        context.clearRect(0, 0, b.width, b.height);
        context.restore();
        this.parts = [];
    };

    this.completed = function() {
        if (target.includedParts.length === parts.length 
            && target.currentValue === target.targetValue) {
            alert("You Got it")
            gamesession.newGame();
        };
    };

    this.newGame = function() { 
        this.reset();
        this.init();
        target.draw();
        drawParts();

        theCanvas.addEventListener("mousedown", mouseDownListener, false);
    };

    function drawParts() {
        for (i = 0; i < parts.length; i++) { 
            parts[i].draw();
        };
    };

    function mouseDownListener(evt) {

    }

    function mouseUpListener(evt) {
        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

        
        theCanvas.removeEventListener("mouseup", mouseUpListener, false);
        theCanvas.addEventListener("mousedown", mouseDownListener, false);
        if (dragIndex >= 0){
            if (hitTest(target, mouseX, mouseY) && (target.partIds.indexOf(parts[dragIndex].id) < 0)) {
                target.includePart(parts[dragIndex], gamesession.sign());
                context.clearRect(0, 0, b.width, b.height);
                context.restore();
                target.draw();
                drawParts();

            } else if ( dragging === true && hitTest(target, mouseX,mouseY) === false && (target.partIds.indexOf(parts[dragIndex].id) > -1)) {
                target.excludePart(parts[dragIndex]);
                context.clearRect(0, 0, b.width, b.height);
                context.restore();
                target.draw();
                drawParts();
            };
        };
        
        if (dragging) {
            dragging = false;
            theCanvas.removeEventListener("mousemove", mouseMoveListener, false);
        }

        completed();
    };

    function hitTest(shape,mx,my) {
        console.log("xxxx122")
        var dx;
        var dy;
        dx = mx - shape.posx;
        dy = my - shape.posy;
        
        //a "hit" will be registered if the distance away from the center is less than the radius of the circular object        
        return (dx*dx + dy*dy < shape.radius*shape.radius);
    };

    function mouseMoveListener(evt) {
        var posX;
        var posY;
        var partRad = parts[dragIndex].radius;
        var minX = partRad;
        var maxX = theCanvas.width - partRad;
        var minY = partRad;
        var maxY = theCanvas.height - partRad;
        //getting mouse position correctly 
        var bRect = theCanvas.getBoundingClientRect();
        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
            
        //clamp x and y positions to prevent object from dragging outside of canvas
        posX = mouseX - dragHoldX;
        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
        posY = mouseY - dragHoldY;
        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
            
        parts[dragIndex].posx = posX;
        parts[dragIndex].posy = posY;
        context.clearRect(0, 0, b.width, b.height);
        context.restore();
        target.draw();
        drawParts();
    }; 
};

try {
  module.exports = GameSession
}
catch(err) {
  console.log(err)
}
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./Part.js":2,"./Target.js":3}],2:[function(require,module,exports){
var Part = function(value) {
    this.value = value;
    this.posx = 50+ Math.random()*300;
    this.posy = 100;
    this.radius = 30;
    this.id = idCounter++;
    var color = getRandomColor();

    this.draw = function() {

        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.fillStyle = color;
        context.fill();
        context.stroke();
        context.fillStyle = '#000000';
        context.font="20px Georgia";
        context.fillText(Math.abs(this.value), this.posx - 20, this.posy + 10);
    };
};

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

try {
  module.exports = Part
}
catch(err) {
  console.log(err)
}
},{}],3:[function(require,module,exports){
var Target = function(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 1;
    this.posx = 250;
    this.posy = 250;
    this.radius = 100;
    this.includedParts = [];
    this.partIds =[];
    var color = getRandomColor();

    this.includePart = function(part, sign) {
        if (sign === "add") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "sub") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "multi") {
            this.currentValue *= Math.abs(part.value);
        }
        this.includedParts.push([part, sign]);
        this.partIds.push(part.id);
    };

    this.excludePart = function(part) {
        var index = this.partIds.indexOf(part.id);
        sign = this.includedParts[index][1]
        if (sign === "add") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "sub") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "multi") {
            this.currentValue /= Math.abs(part.value);
        }
        if (index > -1) {
            this.partIds.splice(index, 1);
            this.includedParts.splice(index, 1);

        };
    };

    this.draw = function() {
        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.fillStyle = color;
        context.fill();
        context.stroke();
        context.fillStyle = '#000000';
        context.font="40px Georgia";
        context.fillText(this.targetValue, this.posx - 30, this.posy - 10);
        context.font="40px Georgia";
        context.fillText(this.currentValue, this.posx - 30, this.posy + 20);
    };
};

try {
  module.exports = Target
}
catch(err) {
  console.log(err)
}
},{}],4:[function(require,module,exports){
try {
  var GameSession = require('./app/GameSession.js');
}
catch(err) {
  console.log(err)
}

var b = document.getElementById("myCanvas");
var context = b.getContext("2d");
var gamesession = new GameSession();
document.getElementById("body").onload = function() {gamesession.init()};

$('#myCanvas').on('mousedown', function(e){
    if (isDown === false) {

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
        y3 = pos.y;

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
},{"./app/GameSession.js":1}]},{},[4]);
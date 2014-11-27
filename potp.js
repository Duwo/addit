// Game implementation
            


var Target = function(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 0;
    this.includedParts = [];
    this.posx = 250;
    this.posy = 250;
    this.radius = 100;
    this.partIds =[];

    this.includePart = function(part, sign) {
        if (sign === "add") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "sub") {
            this.currentValue -= Math.abs(part.value);
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
        }
        if (index > -1) {
            this.partIds.splice(index, 1);
            this.includedParts.splice(index, 1);

        };
    };

    this.draw = function() {
        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.stroke();
        context.font="40px Georgia";
        context.fillText(this.targetValue, this.posx - 30, this.posy - 10);
        context.font="40px Georgia";
        context.fillText(this.currentValue, this.posx - 30, this.posy + 20);
    };
};

var idCounter = 0;

var Part = function(value) {
    this.value = value;
    this.posx = 50+ Math.random()*300;
    this.posy = 100;
    this.radius = 30;
    this.id = idCounter++;


    this.draw = function() {

        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.stroke();
        context.font="20px Georgia";
        context.fillText(Math.abs(this.value), this.posx - 20, this.posy + 10);
    };
};





var GameSession = function() {

    var theCanvas = document.getElementById("myCanvas");
    var bRect = theCanvas.getBoundingClientRect();
    var number_of_parts;
    var parts;
    var target;
    var context = theCanvas.getContext("2d");
    var dragging;
    var dragIndex;
    var dragHoldX;
    var dragHoldY;
    var add = false;  
    var sub = false;
    this.addition = function () {
        if(add === false){
             sub = false;
             add = true;
             document.getElementById("additionButton").style.background="rgba(255,0,0,0.6)"
             document.getElementById("subtractionButton").style.background="#D3D3D3"
        } else if (add === true){
             add = false;
             document.getElementById("additionButton").style.background="#D3D3D3"
        }
    }
    this.subtraction = function () {
        if(sub === false){
             add = false;
             sub = true;
             document.getElementById("subtractionButton").style.background="rgba(255,0,0,0.6)"
             document.getElementById("additionButton").style.background="#D3D3D3"
        } else if (sub === true){
             sub = false;
             document.getElementById("subtractionButton").style.background="#D3D3D3"

        }
    }
    this.get_sign = function () {
        if (add === true) {
           return "add"
        } else if (sub === true) {
           return "sub"
        }
    }

    this.init = function() {

        //later in make target function
        target = new Target(0);
        parts = [];
        level = 4;
        var sum = target.targetValue;
        for (var i=0;i<4;i++) {
           var partValue = Math.floor((Math.random() - 0.5) * 200)
           sum += partValue;
           parts[i] = new Part(partValue);
        }
        var lastPartValue = target.targetValue - sum;
        //var part1Value = Math.floor((Math.random() - 0.5) * 200);
        //var part2Value = Math.floor((Math.random() - 0.5) * 200);
        //var part3Value = target.targetValue - part1Value - part2Value;
        //var part1 = new Part(part1Value);
        //var part2 = new Part(part2Value);
        //var part3 = new Part(part3Value);
        //parts.push(part1);
        //parts.push(part2);
        //parts.push(part3);
        // Later in make parts function

        target.draw(); 
 
    };
    function drawParts() {
        for (i = 0; i < parts.length; i++) { 
            parts[i].draw();
        };
    };


    this.newGame = function() { 
        this.reset();
        target.draw();
        drawParts();

        theCanvas.addEventListener("mousedown", mouseDownListener, false);
    };

    function mouseDownListener(evt) {
        var i;
        //We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
        //only the topmost one will be dragged. 

        // THIS NEEDS TO CHANGE
        var highestIndex = -1;


        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
        dragging = false;
        for (i=0; i < parts.length; i++) {
            if  (hitTest(parts[i], mouseX, mouseY)) {
                dragging = true;
                if (i > highestIndex) {
                    //We will pay attention to the point on the object where the mouse is "holding" the object:
                    dragHoldX = mouseX - parts[i].posx;
                    dragHoldY = mouseY - parts[i].posy;
                    highestIndex = i;
                    dragIndex = i;
                }
            }
        }
        
        if (dragging) {
            window.addEventListener("mousemove", mouseMoveListener, false);
        }

        theCanvas.removeEventListener("mousedown", mouseDownListener, false);
        window.addEventListener("mouseup", mouseUpListener, false);
    }

    function mouseUpListener(evt) {
        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

        theCanvas.addEventListener("mousedown", mouseDownListener, false);
        window.removeEventListener("mouseup", mouseUpListener, false);

        if (hitTest(target, mouseX, mouseY) && (target.partIds.indexOf(parts[dragIndex].id) < 0)) {
            target.includePart(parts[dragIndex], gamesession.get_sign());
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
        
        if (dragging) {
            dragging = false;
            window.removeEventListener("mousemove", mouseMoveListener, false);
        };
        completed();
    };

    function hitTest(shape,mx,my) {
        
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
    
    this.update = function() {
        // Draw all parts

        // Check if click is inside target and recalculate
    
        // Check if target is completed

    };



    this.reset = function() {
        idCounter = 0;
        this.init();
        context.clearRect(0, 0, b.width, b.height);
        context.restore();
        
        this.parts = [];
    };
    function completed() {
        if (target.includedParts.length === parts.length 
            && target.currentValue === target.targetValue) {
           alert("You Got it")
        };

    };
};

var b = document.getElementById("myCanvas");
var context = b.getContext("2d");

gamesession = new GameSession()



document.getElementById("body").onload = function() {gamesession.init()};






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
    var level = 0;
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

    function init() {

        //later in make target function
        //target = new Target(10);
        parts = [];
        level++;
        var sumParts = 0;
        for (var i=0;i<level-1;i++) {
           var partValue = Math.floor((Math.random() - 0.5) * 10)
           sumParts += partValue;
           var value = target.targetValue - partValue
           console.log(value)
           console.log("----------------------")
           parts[i] = new Part(partValue);
           console.log(sumParts)
        }
        var offSet = 10;
        lastValue = offSet - sumParts;
        parts[level-1] = new Part(offSet - sumParts);
        target = new Target(offSet)
        target.draw(); 
 
    };
    function drawParts() {
        for (i = 0; i < parts.length; i++) { 
            parts[i].draw();
        };
    };
    function drawAll() {
    }
    //function newGame() {
    this.newGame = function() { 
        this.reset();
        init();
        drawAll();
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
        console.log(dragging)
        
        if (dragging) {
            console.log("-----hello")
            theCanvas.addEventListener("mousemove", mouseMoveListener, false);
        }

        theCanvas.removeEventListener("mousedown", mouseDownListener, false);
        window.addEventListener("mouseup", mouseUpListener, false);
    }

    function mouseUpListener(evt) {
        console.log("upping the mouse")
    //this.mouseUpListener = function(evt) {
        mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
        mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);

        theCanvas.addEventListener("mousedown", mouseDownListener, false);
        theCanvas.removeEventListener("mouseup", mouseUpListener, false);

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
            theCanvas.removeEventListener("mousemove", mouseMoveListener, false);
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

    //this.mouseMoveListener = function(evt) {
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
        context.clearRect(0, 0, b.width, b.height);
        context.restore();
        
        this.parts = [];
    };
    function completed() {
        if (target.includedParts.length === parts.length 
            && target.currentValue === target.targetValue) {
            alert("You Got it")
            gamesession.newGame();
        };

    };
};

var b = document.getElementById("myCanvas");
var context = b.getContext("2d");

gamesession = new GameSession()



//document.getElementById("body").onload = function() {gamesession.init()};






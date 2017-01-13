(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
GameSession         = {};
GameSession.parts   = [];
GameSession.target;
GameSession.level   = 0;
GameSession.sign;

try {
  var Part = require('./Part.js');
  var Target = require('./Target.js');
  var helper = require('../lib/helper.js')
}
catch(err) {
  console.log(err)
}

GameSession.init = function(canvas) {
    GameSession.canvas  = canvas
    GameSession.context = GameSession.canvas.getContext("2d");
    GameSession.bRect   = GameSession.canvas.getBoundingClientRect();
    this.reset();
    this.nextLevel();
};

GameSession.nextLevel = function() {
    this.reset();
    this.level++;
    this.createElements()
    this.update();
};

GameSession.createElements = function() {
    sumParts = GameSession.addParts();
    addTarget = GameSession.addTarget(sumParts)
};

GameSession.addTarget = function(level) {
    this.target = new Target(this.canvas, sumParts)
};

GameSession.addParts = function() {
    sumParts = 1;
    partValue = 0;
    for (var i=0 ; i < this.level; i++) {
        partValue, sumParts = helper.addValue(sumParts)
        this.parts[i] = new Part(this.canvas, partValue);
    };
    return sumParts
};

GameSession.switch_sign = function(el, sign) {
    this.sign = sign
    $(".signs").css('backgroundColor','white')
    $(el).css('backgroundColor','red')
};

GameSession.reset = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    this.parts = [];
};

GameSession.completed = function() {
    if (this.target.parts.length === this.parts.length 
        && this.target.currentValue === this.target.targetValue) {
        alert("You Got it")
        this.nextLevel();
    };
};

GameSession.update = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
    this.context = $('#myCanvas')[0].getContext("2d");
    this.target.draw(this.context);
    for (i = 0; i < this.parts.length; i++) {
        this.parts[i].draw(this.context);
    };
};

try {
  module.exports = GameSession
}
catch(err) {
  console.log(err)
}
},{"../lib/helper.js":5,"./Part.js":2,"./Target.js":3}],2:[function(require,module,exports){
try {
  var helper = require('../lib/helper.js')
}
catch(err) {
  console.log(err)
}

function Part (canvas, value) {
    this.value = value;
    this.posx =  canvas.width/10 + Math.random()*canvas.width/2;
    this.posy = canvas.height/6;
    this.radius = canvas.width/20;
    this.color = helper.getRandomColor();
    this.sign  = '';

    this.draw = function(context) {
        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.fillStyle = '#000000';
        context.font= canvas.width/20 + "px Georgia";
        context.fillText(this.sign + Math.abs(this.value), this.posx - canvas.width/30, this.posy + canvas.width/50)
    };
};

try {
  module.exports = Part
}
catch(err) {
  console.log(err)
}
},{"../lib/helper.js":5}],3:[function(require,module,exports){
try {
  var helper = require('../lib/helper.js')
}
catch(err) {
  console.log(err)
}

function Target(canvas, targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 1;    
    this.posx = canvas.width/2;
    this.posy = canvas.height/2;
    this.radius = canvas.width/6;
    this.parts = [];
    this.signs = [];
    this.color = helper.getRandomColor();

    this.includePart = function(part, sign) {
        if (sign === "+") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "-") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "*") {
            this.currentValue *= Math.abs(part.value);
        }
        this.parts.push(part);
        this.signs.push(sign);
    };

    this.excludePart = function(part) {
        index = this.parts.indexOf(part);        
        sign = this.signs[index]
        if (sign === "+") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "-") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "*") {
            this.currentValue /= Math.abs(part.value);
        }
        if (index > -1) {
            this.parts.splice(index, 1);
            this.signs.splice(index, 1);
        };
    };
    this.update = function(canvas, context){
        /*this.posx = canvas.width/2;
        this.posy = canvas.height/2;
        this.radius = canvas.width/6;
        */this.draw(context);
    };
    this.draw = function(context) {
        context.beginPath();
        context.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.fillStyle = '#000000';
        context.font = canvas.width/10 + "px Georgia";
        context.fillText(this.targetValue, this.posx - canvas.width/20, this.posy - canvas.width/30);
        context.fillText(this.currentValue, this.posx - canvas.width/20, this.posy + canvas.width/10);
    };
};

try {
  module.exports = Target
}
catch(err) {
  console.log(err)
}
},{"../lib/helper.js":5}],4:[function(require,module,exports){
static_path = 'https://erikrodhe.s3.amazonaws.com/static/addit'
canvas = $('<canvas>',
    {
        id: "myCanvas",
        class: ""
    });
buttons = $('<div>',
    {
        id: "buttons",
        class: ""
    });

buttons_list = [
  {
    'id': "myBtn",
    'event': "GameSession.nextLevel()",
    'text': "New",
    'image': "startbutton.png"
  },
  {
    'id': "additionButton",
    'event': "GameSession.switch_sign($(this),'+')",
    'text': "",
    'image': "addition.gif"
  },
  {
    'id': "subtractionButton",
    'event': "GameSession.switch_sign($(this),'-')",
    'text': "",
    'image': "Subtraction.jpg"
  },
  {
    'id': "multiplicationButton",
    'event': "GameSession.switch_sign($(this),'*')",
    'text': "",
    'image': "multiply.png"
  }
]

for (var i in buttons_list) {
    button = $('<button>',
    {
        id: buttons_list[i]['id'],
        class: 'signs',
        onClick: buttons_list[i]['event'],
        text: buttons_list[i]['text']
    });
    button.append(`<img src="${static_path}/images/${buttons_list[i]['image']}"/>`)
    buttons.append(button)
};

$("#content").append(canvas)
$('#myCanvas')[0].width = 400;
$('#myCanvas')[0].height = 400;
$("#content").append(buttons)
},{}],5:[function(require,module,exports){
var helper = {
  getRandomColor: function() {
    letters = '0123456789ABCDEF'.split('');
    color = '#';
    for (i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

// Cicle hit
  hitTest: function(circle, mx, my) {
    dx = mx - circle.posx;
    dy = my - circle.posy;
    //a "hit" will be registered if the distance away 
    // from the center is less than the radius of the circular object        
    return (dx*dx + dy*dy < circle.radius*circle.radius);
  },

  contains: function(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
  },

  addValue: function(sumParts) {
    partValue = Math.floor((Math.random() * 10) + 1)
    sign = Math.round(Math.random() * 2)
    if (sign === 0) {
      sumParts += partValue
    } else if (sign === 1){
      sumParts -= partValue
    } else if (sign === 2) {
      sumParts *= partValue
    }
    return partValue, sumParts
  },
  convertMouse: function(evt, canvas) {
    if (evt.pageX || evt.pageY) { 
      x = evt.offsetX;
      y = evt.offsetY;
    }
    else { 
      x = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }
    console.log('PageX: '+evt.pageX)
    console.log('PageX: '+evt.pageX)
    //x -= canvas.offsetLeft;
    //y -= canvas.offsetTop;
    return [x, y]
  }
};

try {
  module.exports = helper
}
catch(err) {
  console.log(err)
}
},{}],6:[function(require,module,exports){
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
},{"./app/GameSession.js":1,"./app/View.js":4,"./lib/helper.js":5}]},{},[6]);

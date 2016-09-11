var GameSession = {}
GameSession.parts = [];
GameSession.target;
GameSession.level = 0;
GameSession.sign;

try {
  var Part = require('./Part.js');
  var Target = require('./Target.js');
}
catch(err) {
  console.log(err)
}

GameSession.init = function() {
    this.level++;
    sumParts = 1;
    for (var i=0;i< this.level;i++) {
        var partValue = Math.floor((Math.random() * 10) + 1)
        sign = Math.round(Math.random() * 2)
        if (sign === 0) {
            sumParts += partValue
        } else if (sign === 1){
            sumParts -= partValue
        } else if (sign === 2) {
            console.log("*")
            console.log(partValue)
            sumParts *= partValue
        }
        this.parts[i]     = new Part(partValue);
    };
    this.target = new Target(sumParts)
    this.update();
};

GameSession.switch_sign = function(el, sign) {
    GameSession.sign = sign
    $(".signs").css('backgroundColor','white')
    $(el).css('backgroundColor','red')
}

GameSession.reset = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    this.parts = [];
};

GameSession.completed = function() {
    if (this.target.parts.length === this.parts.length 
        && this.target.currentValue === this.target.targetValue) {
        alert("You Got it")
        this.newGame();
    };
};

GameSession.update = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    this.target.draw();
    for (i = 0; i < this.parts.length; i++) { 
      this.parts[i].draw();
    };
    this.completed();
};

GameSession.newGame = function() { 
    this.reset();
    this.init();
};

function getRandomColor () {
    letters = '0123456789ABCDEF'.split('');
    color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function hitTest(shape, mx, my) {
    dx = mx - shape.posx;
    dy = my - shape.posy;
    //a "hit" will be registered if the distance away 
    // from the center is less than the radius of the circular object        
    return (dx*dx + dy*dy < shape.radius*shape.radius);
};

try {
  module.exports = GameSession
}
catch(err) {
  console.log(err)
}
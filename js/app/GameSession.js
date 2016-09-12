GameSession         = {};
GameSession.parts   = [];
GameSession.target;
GameSession.level   = 0;
GameSession.sign;
GameSession.canvas  = document.getElementById("myCanvas")
GameSession.context = GameSession.canvas.getContext("2d");
GameSession.bRect   = GameSession.canvas.getBoundingClientRect();

try {
  var Part = require('./Part.js');
  var Target = require('./Target.js');
}
catch(err) {
  console.log(err)
}

GameSession.init = function() {
    this.canvas.addEventListener("mousedown", mouseDownListener, false);
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
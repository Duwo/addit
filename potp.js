// Game implementation
            


var Target = function(targetValue) {


    this.targetValue = targetValue;
    this.currentValue = 0;
    this.includedParts = [];
    this.posx = 250;
    this.posy = 250;
    this.radius = 100;

    this.includePart = function(part) {
        this.currentValue += part.value;
        this.includedParts.push(part);
    };

    this.draw = function() {
        var b = document.getElementById("myCanvas");
        var ctx = b.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        ctx.stroke();
        ctx.font="40px Georgia";
        ctx.fillText(this.targetValue, this.posx - 30, this.posy - 10);
        ctx.font="40px Georgia";
        ctx.fillText(this.currentValue, this.posx - 30, this.posy + 20);
    };
};

var Part = function(value) {
    this.value = value;
    this.posx = 50+ Math.random()*300;
    this.posy = 100;
    this.radius = 30;

    this.draw = function() {
        var b = document.getElementById("myCanvas");
        var ctx = b.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radius,0,2*Math.PI);
        ctx.stroke();
        ctx.font="40px Georgia";
        ctx.fillText(this.value, this.posx - 20, this.posy + 10);
    };
};

var GameSession = function() {
    this.target = new Target(100);
    this.parts = [];

    this.newGame = function () {
        this.target.draw();
    };

    this.split = function() {
        var part1 = new Part(50);
        var part2 = new Part(50);
        this.parts.push(part1);
        this.parts.push(part2);

        for (i = 0; i < this.parts.length; i++) { 
            this.parts[i].draw();
        };

    };


};

var gamesession = document.getElementById("body").onload = function(){
    var gamesession = new GameSession();
    gamesession.newGame();
    gamesession.split();
};




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
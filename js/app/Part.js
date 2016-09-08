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
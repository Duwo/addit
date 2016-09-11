//var Target = function(targetValue) {
function Target(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 1;
    this.posx = canvas.width/2;
    this.posy = canvas.width/2;
    this.radius = canvas.width/6;
    this.parts = [];
    this.signs = [];
    this.color = getRandomColor();

    this.includePart = function(part, sign) {
        console.log(part)
        if (sign === "add") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "subtraction") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "multiplication") {
            this.currentValue *= Math.abs(part.value);
        }
        this.parts.push(part);
        this.signs.push(sign);
    };

    this.excludePart = function(part) {
        index = this.parts.indexOf(part);        
        sign = this.signs[index]
        if (sign === "add") {
            this.currentValue -= Math.abs(part.value);
        } else if(sign === "subtraction") {
            this.currentValue += Math.abs(part.value);
        } else if(sign === "multiplication") {
            this.currentValue /= Math.abs(part.value);
        }
        if (index > -1) {
            this.parts.splice(index, 1);
            this.signs.splice(index, 1);
        };
    };

    this.draw = function() {
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
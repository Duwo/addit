var Target = function(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 1;
    this.posx = 250;
    this.posy = 250;
    this.radius = 100;
    this.includedParts = [];
    this.partIds =[];
    this.color = getRandomColor();

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
        context.fillStyle = this.color;
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
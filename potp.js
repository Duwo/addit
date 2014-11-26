// Game implementation

var Target = function(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 0;
    this.includedParts = [];

    this.includePart = function(part) {
	this.currentValue += part.value;
	this.includedParts.push(part);
    };
};

var Part = function(value) {
    this.value = value
};

var GameSession = function() {
    this.target = new Target(100);
    this.parts = [];

    this.split = function() {
	var part1 = new Part(50);
	var part2 = new Part(50);
	this.parts.push(part1);
	this.parts.push(part2);
    };
};

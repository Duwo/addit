// Game implementation

var Target = function(targetValue) {
    this.targetValue = targetValue;
    this.currentValue = 0;
    this.includedParts = [];

    this.includePart = function(part) {
	this.currentValue += part.value;
	this.includedParts.push(part);
    }
}

var Part = function(value) {
    this.value = value
}

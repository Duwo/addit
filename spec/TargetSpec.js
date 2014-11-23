describe("Target", function() {
	describe("on Initialization", function(){
		var target;
		beforeEach(function() {
      		target = new Target(100);
      	});

      	it("contains the provided TargetValue", function() {
	  		expect(target.targetValue).toBe(100); 	
		}); 

		it("contains the default currentValue 0", function() {
			expect(target.currentValue).toBe(0);
		});



	});

	describe("includes a parts", function(){
		it("updates currentValue", function(){
			var target = new Target(100);
			currentValue = target.currentValue;
			var part   = new Part(50);
			target.includePart(part);
			expect(target.currentValue).toBe(currentValue+part.value);
		});
	}); 
});
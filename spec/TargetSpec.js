describe("Target", function() {
    describe("on Initialization", function() {
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

    describe("includes parts", function() {

        it("updates currentValue", function() {
            var target = new Target(100);
            var part   = new Part(50);
            currentValue = target.currentValue;
            target.includePart(part);
                
            expect(target.currentValue).toBe(currentValue+part.value);
        });

        it("keeps track of included parts", function() {
            var target  = new Target(100);
            var part1   = new Part(50);
            var part2   = new Part(25);
            target.includePart(part1);
            target.includePart(part2);

            expect(target.includedParts).toContain(part1);
            expect(target.includedParts).toContain(part2);
        });

    }); 
});


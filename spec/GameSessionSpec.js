describe("GameSession", function() {
    
    describe("on initialization", function() {
	
	it("should have a target", function() {
	    var session = new GameSession();
	    expect(session.target).toBeDefined();
	});

	it("should not have any parts", function() {
	    var session = new GameSession();
	    expect(session.parts).toEqual([]);
	});
    });

    describe("when splitting target", function() {
	
	it("should create parts", function() {
	    var session = new GameSession();
	    session.split();
	    expect(session.parts).not.toEqual([]);
	});
    });
});


describe("Part", function() {
    
  it("contains a specified value", function() {
      var part = new Part(42);
      expect(part.value).toBe(42);
  });
});

describe("MyObject", function () {
    var obj = new MyObject("clean"); // sets initial state
        
    afterEach(function () {
        obj.setState("clean");
    });
    it("changes state", function () {
        obj.setState("dirty");
        expect(obj.getState()).toEqual("dirty");
    })
    it("adds states", function () {
        obj.addState("packaged");
        expect(obj.getState()).toEqual(["clean", "packaged"]);
    });
    it("should be instanceof MyObject", function () {
        expect(obj instanceof MyObject).toBeTruthy();
    });

});

describe("test", function () {
    beforeEach(function () {
		this.addMatchers({
			toBeBetween: function (rangeFloor, rangeCeiling) {
				if (rangeFloor > rangeCeiling) {
					var temp = rangeFloor;
					rangeFloor = rangeCeiling;
					rangeCeiling = temp;
				}
				return this.actual > rangeFloor && this.actual < rangeCeiling;
			}
		});
	});
	it("works", function () {
	    expect(10).toBeBetween(5, 30);
	});
	it("works too", function () {
	    expect(100).toBeBetween(500, 30);
	});
});

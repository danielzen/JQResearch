// Refactored using an enclosing Pattern
// http://www.klauskomenda.com/code/javascript-programming-patterns/#module
// Modeled after jquery definition. Still searching for my ideal object definition pattern

var MyObject = (function () {
  var MyObject = function (state) {
//    var obj = new MyObject();
    return new MyObject.fn.init(state);
  };

  MyObject.fn = MyObject.prototype = {
    constructor: MyObject,
    init: function(state) {
      this.setState(state);
      return this;
    },
    setState:function (state) {
      this._state = state;
    },
    addState:function (state) {
      if (typeof this._state === "string") {
        this._state = [this._state, state];
      } else {
        this._state.push(state);
      }
    },
    getState:function () {
      return this._state;
    }
  };
  MyObject.fn.init.prototype = MyObject.fn;
  return MyObject;
  //  Can I create a revealing pattern with this?
  //  {init: init, setState: setState, getState: getState, addState: addState };
})();

/*
 // Old School
 //
var MyObject = function (state) {
  this._state = state;
}


MyObject.prototype.setState = function (state) {
  this._state = state;
};


MyObject.prototype.addState = function (state) {
  if (typeof this._state === "string") {
    this._state = [this._state, state];
  } else {
    this._state.push(state);
  }
};

MyObject.prototype.getState = function () {
  return this._state;
}
*/

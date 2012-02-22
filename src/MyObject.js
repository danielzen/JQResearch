// Refactored using an enclosing Pattern
// http://www.klauskomenda.com/code/javascript-programming-patterns/#module
// Modeled after jquery definition. Still searching for my ideal object definition pattern

var _class = function (cls) {
  var classObj = function (args) {
    return new classObj.fn.init(args);
  };

  classObj.fn = classObj.prototype = cls;
  classObj.fn.init.prototype = classObj.fn;
  return classObj;

  // TODO: Can I create a revealing pattern with this? Hide fn?
};

var MyObject = _class({
//  constructor:this,
  init:function (state) {
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
});


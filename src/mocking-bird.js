const isEqual = require("lodash/isEqual"),
  NOT_CALLED = 0,
  CALLED_ONCE = 1,
  CALLED_TWICE = 2,
  CALLED_THRICE = 3;

const registry = Symbol();

/**
 * @private
 * Test double container
 */
class MockingBird {
  constructor() {
    this[registry] = [];
  }

  notCalled() {
    return this[registry].length === NOT_CALLED;
  }

  register(callArgs) {
    this[registry].push(callArgs);
  }

  calledOnce() {
    return this.callCount() === CALLED_ONCE;
  }

  calledTwice() {
    return this.callCount() === CALLED_TWICE;
  }

  calledThrice() {
    return this.callCount() === CALLED_THRICE;
  }

  callCount() {
    return this[registry].length;
  }

  args(count) {
    if (this.notCalled()) throw "test double is yet to be called";
    if (this.isWithCallCount(count)) throw "count not valid";
    if (count === undefined) count = this.callCount();
    return this[registry][count - 1];
  }

  isWithCallCount(count) {
    return count < CALLED_ONCE || count > this.callCount();
  }

  calledWith(...args) {
    if (this.notCalled()) return false;
    const lastCalledArgs = this.args();
    return isEqual(lastCalledArgs, args);
  }

  inspect(count) {
    const args = this.args(count);
    return {
      args,
      calledWith: (..._args) => isEqual(args, _args)
    };
  }

  reset() {
    this[registry] = [];
  }
}

module.exports = MockingBird;

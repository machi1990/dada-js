const MockingBird = require("./mocking-bird");

/**
 * @summary Creates a dummy function returning a value passed as parameter.
 * The function can be passed around but never actually used.
 * Usually it can be used as a callback.
 * Has the same API (expect for the reconstruct method) as mocks in our case.
 * @param {*} of
 */
module.exports = of => {
  const dummyBird = new MockingBird();
  const dummy = (...args) => {
    dummyBird.register(args);
    return of;
  };

  const dummyMethods = {
    args: dummyBird.args.bind(dummyBird),
    reset: dummyBird.reset.bind(dummyBird),
    inspect: dummyBird.inspect.bind(dummyBird),
    callCount: dummyBird.callCount.bind(dummyBird),
    notCalled: dummyBird.notCalled.bind(dummyBird),
    calledWith: dummyBird.calledWith.bind(dummyBird),
    calledOnce: dummyBird.calledOnce.bind(dummyBird),
    calledTwice: dummyBird.calledTwice.bind(dummyBird),
    calledThrice: dummyBird.calledThrice.bind(dummyBird)
  };

  for (const key in dummyMethods) {
    dummy[key] = dummyMethods[key];
  }

  return dummy;
};

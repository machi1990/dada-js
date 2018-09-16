const MockingBird = require("./mocking-bird");
/**
 * Creates a spy object for a function whose name is given in parameter
 * `spyFnName` of a given object `obj`. The created object records
 * some information based on how the real function was called. One form
 * of this might be an email service that records how many messages it was sent.
 * @param {*} obj
 * @param {*} spyFnName
 * @returns
 * - `args`: returns a list of arguments of a given call count.
 * - `reset`: resets the call count.
 * - `inspect`: the nth call of the created spy. Returns the list of args of this call and can also verify if the this call was called with given parameters.
 * - `callCount`: returns the call count of the create spy.
 * - `calledWith`: verify if the last call of this spy was called with given list of parameters.
 * - `calledOnce`: returns true if the spy was called once, false otherwise.
 * - `calledTwice`: returns true if the spy was called twice, false otherwise.
 * - `calledThrice`: returns true if the spy was called three times, false otherwise.
 */
module.exports = (obj, spyFnName) => {
  if (!obj[spyFnName]) throw "undefined function";

  const fn = obj[spyFnName];
  if (typeof fn !== "function") throw "property is not a function";

  const spyBird = new MockingBird();
  const spy = (...args) => {
    spyBird.register(args);
    return fn.apply(obj, args);
  };

  obj[spyFnName] = spy;

  return {
    args: spyBird.args.bind(spyBird),
    reset: spyBird.reset.bind(spyBird),
    inspect: spyBird.inspect.bind(spyBird),
    callCount: spyBird.callCount.bind(spyBird),
    calledWith: spyBird.calledWith.bind(spyBird),
    calledOnce: spyBird.calledOnce.bind(spyBird),
    calledTwice: spyBird.calledTwice.bind(spyBird),
    calledThrice: spyBird.calledThrice.bind(spyBird)
  };
};

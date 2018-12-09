const MockingBird = require("./mocking-bird");
/**
 * @summary Creates a spy object for a function whose name is given in parameter
 * `spyFnName` of a given object `obj`. The created object records
 * some information based on how the real function was called. One form
 * of this might be an email service that records how many messages it was sent.
 * @param {*} obj
 * @param {*} spyFnName
 * @returns
 * - `args(count)`: returns a list of arguments of a given call count.
 *                If count not provided, returns the args of the last
 *                call.
 * - `reset()`: resets the call count.
 * - `inspect(count)`: inspect the elements of the nth call (if count not provided, applies the logic for the last call.) of the spy.
 *                  Returns the list of args of this call and can also verify if the this call was called with given parameters.
 * - `callCount()`: returns the total call count of the create spy.
 * - `calledWith(...args)`: verify if the last call of this spy was called with given list of parameters.
 * - `calledOnce()`: returns true if the spy was called once, false otherwise.
 * - `calledTwice()`: returns true if the spy was called twice, false otherwise.
 * - `calledThrice()`: returns true if the spy was called three times, false otherwise.
 */
module.exports = (obj, spyFnName) => {
  if (!obj[spyFnName]) throw "undefined function";

  if (typeof obj[spyFnName] !== "function") throw "property is not a function";

  const originalFn = obj[spyFnName].bind(obj);
  const spyBird = new MockingBird();
  const spy = (...args) => {
    spyBird.register(args);
    return originalFn.apply(undefined, args);
  };

  obj[spyFnName] = spy;
  const reconstruct = () => {
    obj[spyFnName] = originalFn;
  };

  const spyMethods = {
    reconstruct,
    args: spyBird.args.bind(spyBird),
    reset: spyBird.reset.bind(spyBird),
    inspect: spyBird.inspect.bind(spyBird),
    notCalled: spyBird.notCalled.bind(spyBird),
    callCount: spyBird.callCount.bind(spyBird),
    calledWith: spyBird.calledWith.bind(spyBird),
    calledOnce: spyBird.calledOnce.bind(spyBird),
    calledTwice: spyBird.calledTwice.bind(spyBird),
    calledThrice: spyBird.calledThrice.bind(spyBird)
  };

  for (const key in spyMethods) {
    obj[spyFnName][key] = spyMethods[key];
  }

  return obj[spyFnName];
};

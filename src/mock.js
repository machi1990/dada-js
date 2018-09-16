const MockingBird = require("./mocking-bird");
/**
 * @summary Mocks a function `mockFnName` of a given `obj`.
 * Creates a pre-programmed function with expectations which form
 * a specification of the calls they are expected to receive.
 * The function does not throw an exception if they receive a call
 * it does not expect. The created function can be checked during
 * verification to ensure they got all the calls they were expecting.
 * @param {*} obj
 * @param {*} mockFnName
 * @returns
 * - `args(count)`: returns a list of arguments of a given call count.
 *                If count not provided, returns the args of the last
 *                call.
 * - `reset()`: resets the call count.
 * - `inspect(count)`: inspect the elements of the nth call (if count not provided, applies the logic for the last call.) of the created mock.
 *                  Returns the list of args of this call and can also verify if the this call was called with given parameters.
 * - `callCount()`: returns the call count of the create mock.
 * - `calledWith(...args)`: verify if the last call of this mock was called with given list of parameters.
 * - `calledOnce()`: returns true if the mock was called once, false otherwise.
 * - `calledTwice()`: returns true if the mock was called twice, false otherwise.
 * - `calledThrice()`: returns true if the mock was called three times, false otherwise.
 */
module.exports = (obj, mockFnName) => {
  const mockBird = new MockingBird();
  obj[mockFnName] = (...args) => mockBird.register(args);

  return {
    args: mockBird.args.bind(mockBird),
    reset: mockBird.reset.bind(mockBird),
    inspect: mockBird.inspect.bind(mockBird),
    callCount: mockBird.callCount.bind(mockBird),
    calledWith: mockBird.calledWith.bind(mockBird),
    calledOnce: mockBird.calledOnce.bind(mockBird),
    calledTwice: mockBird.calledTwice.bind(mockBird),
    calledThrice: mockBird.calledThrice.bind(mockBird)
  };
};

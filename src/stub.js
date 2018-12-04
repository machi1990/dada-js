const isEqual = require("lodash/isEqual");
const MockingBird = require("./mocking-bird");

/**
 * @summary Creates an object that provides canned answers to calls made during
 * the test. Usually not responding at all `returns undefined` to anything
 * outside what's programmed in for the test: see `when, throws and returns`
 * constructs.
 *
 * @param {*} obj
 * @param {*} stubFnName
 * - `args(count)`: returns a list of arguments of a given call count.
 *                If count not provided, returns the args of the last
 *                call.
 * - `reset()`: resets the call count.
 * - `inspect(count)`: inspect the elements of the nth call (if count not provided, applies the logic for the last call.) of the stub.
 *                  Returns the list of args of this call and can also verify if the this call was called with given parameters.
 * - `callCount()`: returns the total call count of the create mock.
 * - `calledWith(...args)`: verify if the last call of this mock was called with given list of parameters.
 * - `calledOnce()`: returns true if the mock was called once, false otherwise.
 * - `calledTwice()`: returns true if the mock was called twice, false otherwise.
 * - `calledThrice()`: returns true if the mock was called three times, false otherwise.
 * - `throws(error)`: will throw an error on each stub call.
 * - `returns(value)`: will return the value on each stub call.
 * - `when(...args)`: register a function call with given parameters. Should be immediatiately followed by, the call to either.
 *       (a) `throws(error)`: will throw an error when the call argument matches `args`  supplied in the `when` construct.
 *       (b) `returns(value)`: will return the value when the call argument matches `args`  supplied in the `when` construct.
 */
module.exports = (obj, stubFnName) => {
  let whenRecords = [],
    globalRecord = {
      shouldReturn: true,
      throwValue: undefined,
      returnValue: undefined
    };

  const stubBird = new MockingBird();

  const reset = () => {
    stubBird.reset();
    whenRecords = [];
    globalRecord = {
      throwValue: undefined,
      returnValue: undefined,
      shouldReturn: true
    };
  };

  const stubBed = {
    reset,
    args: stubBird.args.bind(stubBird),
    inspect: stubBird.inspect.bind(stubBird),
    notCalled: stubBird.notCalled.bind(stubBird),
    callCount: stubBird.callCount.bind(stubBird),
    calledWith: stubBird.calledWith.bind(stubBird),
    calledOnce: stubBird.calledOnce.bind(stubBird),
    calledTwice: stubBird.calledTwice.bind(stubBird),
    calledThrice: stubBird.calledThrice.bind(stubBird)
  };

  const returnsFn = record => {
    return value => {
      record.returnValue = value;
      record.shouldReturn = true;
      return {
        ...stubBed,
        when
      };
    };
  };

  const throwsFn = record => {
    return error => {
      record.throwValue = error;
      record.shouldReturn = false;
      return {
        ...stubBed,
        when
      };
    };
  };

  const when = (...args) => {
    const record = {
      args,
      throwValue: undefined,
      returnValue: undefined,
      shouldReturn: undefined
    };

    whenRecords.push(record);

    return {
      throws: throwsFn(record),
      returns: returnsFn(record)
    };
  };

  const callResponse = args => {
    const recordedWhens = whenRecords.filter(
      record => record.shouldReturn !== undefined && isEqual(record.args, args)
    );
    return recordedWhens.pop() || globalRecord;
  };

  const throws = throwsFn(globalRecord);
  const returns = returnsFn(globalRecord);

  const stub = (...args) => {
    stubBird.register(args);
    const recorded = callResponse(args);
    if (recorded.shouldReturn) return recorded.returnValue;
    else throw recorded.throwValue;
  };

  const originalFn = obj[stubFnName].bind(obj);

  obj[stubFnName] = stub;
  const revive = () => {
    obj[stubFnName] = originalFn;
  };

  const stubMethods = {
    when,
    throws,
    revive,
    returns,
    ...stubBed
  };

  for (const method in stubMethods) {
    obj[stubFnName][method] = stubMethods[method];
  }

  return obj[stubFnName];
};

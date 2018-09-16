const MockingBird = require("./mocking-bird");
const isEqual = require("lodash/isEqual");

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
  let withSuccess = true;
  let throwValue = undefined;
  let returnValue = undefined;

  const whenConstruct = {
    called: false,
    records: []
  };

  const lastRecorded = () => {
    const records = whenConstruct.records;
    return records[records.length - 1];
  };

  const when = (...args) => {
    whenConstruct.called = true;
    whenConstruct.records.push({
      args,
      throwValue: undefined,
      returnValue: undefined
    });
  };

  const returns = value => {
    if (whenConstruct.called) {
      const lasRecord = lastRecorded();
      lasRecord.returnValue = value;
      lasRecord.shouldReturn = true;
      whenConstruct.called = false;
    } else {
      returnValue = value;
      withSuccess = true;
    }
  };

  const throws = error => {
    if (whenConstruct.called) {
      const lasRecord = lastRecorded();
      lasRecord.throwValue = error;
      lasRecord.shouldReturn = false;
      whenConstruct.called = false;
    } else {
      throwValue = error;
      withSuccess = false;
    }
  };

  const lastRecordedWhenConstructForArgs = args => {
    const records = whenConstruct.records;
    const recordedWhens = records.filter(record => {
      return (
        isEqual(record.args, args) && (record.returnValue || record.throwValue)
      );
    });

    return recordedWhens.pop();
  };

  const stubBird = new MockingBird();
  obj[stubFnName] = (...args) => {
    stubBird.register(args);
    const recorded = lastRecordedWhenConstructForArgs(args);
    if (!recorded) {
      if (withSuccess) return returnValue;
      else throw throwValue;
    } else if (recorded.shouldReturn) return recorded.returnValue;
    else throw recorded.throwValue;
  };

  return {
    when,
    throws,
    returns,
    args: stubBird.args.bind(stubBird),
    reset: stubBird.reset.bind(stubBird),
    inspect: stubBird.inspect.bind(stubBird),
    callCount: stubBird.callCount.bind(stubBird),
    calledWith: stubBird.calledWith.bind(stubBird),
    calledOnce: stubBird.calledOnce.bind(stubBird),
    calledTwice: stubBird.calledTwice.bind(stubBird),
    calledThrice: stubBird.calledThrice.bind(stubBird)
  };
  return stub;
};

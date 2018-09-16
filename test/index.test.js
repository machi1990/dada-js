const { expect } = require("chai");
const testDouble = require("../");

describe("Test Doubles", () => {
  it("loads different categories of test doubles", () => {
    expect(testDouble.spy).to.be.a("function");
    expect(testDouble.mock).to.be.a("function");
    expect(testDouble.stub).to.be.a("function");
    expect(testDouble.dummy).to.be.a("function");
  });
});

const { expect } = require("chai");

describe("Dummy", () => {
  const dummy = require("../src/dummy");
  context(".dummy(of)", () => {
    context("return type not provided", () => {
      it("creates dummy function that returns undefined on each invocation", () => {
        // Given
        const args = ["bar"];

        // When
        const myDummy = dummy();
        const results = myDummy(args);

        // Then
        expect(results).to.be.equal(undefined);
      });
    });

    context("return type defined", () => {
      it("creates dummy function that returns the given value on each invocation", () => {
        // Given
        const args = ["bar"];

        // When
        const myDummy = dummy({});
        const results = myDummy(args);

        // Then
        expect(results).to.eql({});
      });
    });
  });
});

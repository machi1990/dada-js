const { expect } = require("chai");
const dummy = require("../src/dummy");

describe("Dummy", () => {
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

    context(".callCount()", () => {
      context("not called", () => {
        it("returns zero", () => {
          // Given
          const myDummy = dummy();

          // Then
          expect(myDummy.callCount()).to.equal(0);
        });

        context(".notCalled()", () => {
          it("returns true", () => {
            // Given
            const myDummy = dummy();

            // Then
            expect(myDummy.notCalled()).to.equal(true);
          });
        });
      });

      context("called one time", () => {
        it("returns one", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          // Then
          expect(myDummy.callCount()).to.equal(1);
        });

        context(".notCalled()", () => {
          it("returns false", () => {
            // When
            const myDummy = dummy();
            myDummy();
            // Then
            expect(myDummy.notCalled()).to.equal(false);
          });
        });
      });

      context("called two times", () => {
        it("returns two", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();

          // Then
          expect(myDummy.callCount()).to.equal(2);
        });
      });

      context("called three times", () => {
        it("returns three", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();
          myDummy();

          // Then
          expect(myDummy.callCount()).to.equal(3);
        });
      });

      context("called more than three times", () => {
        it("returns the number of time the dummy was called", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();
          myDummy();
          myDummy();
          myDummy();
          myDummy();

          // Then
          expect(myDummy.callCount()).to.equal(6);
        });
      });
    });

    context(".calledOnce()", () => {
      context("called once", () => {
        it("returns true", () => {
          // Given
          const myDummy = dummy();
          // When
          myDummy();
          // Then
          expect(myDummy.calledOnce()).to.equal(true);
        });
      });

      context("not called once", () => {
        it("returns false", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();
          myDummy();

          // Then
          expect(myDummy.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledTwice()", () => {
      context("called twice", () => {
        it("returns true", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();

          // Then
          expect(myDummy.calledTwice()).to.equal(true);
        });
      });

      context("not called twice", () => {
        it("returns false", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();
          myDummy();

          // Then
          expect(myDummy.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledThrice()", () => {
      context("called thrice", () => {
        it("returns true", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();
          myDummy();
          myDummy();

          // Then
          expect(myDummy.calledThrice()).to.equal(true);
        });
      });

      context("not called thrice", () => {
        it("returns false", () => {
          // Given
          const myDummy = dummy();

          // When
          myDummy();

          // Then
          expect(myDummy.calledThrice()).to.equal(false);
        });
      });
    });

    context(".calledWith(args)", () => {
      context("dummy not called", () => {
        it("returns false", () => {
          // Given
          const myDummy = dummy();

          // When
          const calledWithArgs = myDummy.calledWith({});

          // Then
          expect(calledWithArgs).to.equal(false);
        });
      });

      context("dummy called", () => {
        context("dummy called without arguments", () => {
          it("returns false", () => {
            // Given
            const myDummy = dummy();
            myDummy();

            // When
            const calledWithArgs = myDummy.calledWith();

            // Then
            expect(calledWithArgs).to.equal(true);
          });
        });

        context("dummy called with arguments", () => {
          context("dummy called with exact arguments", () => {
            context("arguments list contains only primitive types", () => {
              it("returns true", () => {
                // Given
                const myDummy = dummy();
                myDummy(true);

                // When
                const calledWithArgs = myDummy.calledWith(true);

                // Then
                expect(calledWithArgs).to.equal(true);
              });
            });

            context(
              "arguments list contains object, array, and primitive types",
              () => {
                it("returns true", () => {
                  // Given
                  const myDummy = dummy();
                  myDummy({}, true, []);

                  // When
                  const calledWithArgs = myDummy.calledWith({}, true, []);

                  // Then
                  expect(calledWithArgs).to.equal(true);
                });
              }
            );
          });

          context("dummy not called with exact arguments", () => {
            it("returns false", () => {
              // Given
              const myDummy = dummy();
              myDummy(true);

              // When
              const calledWithArgs = myDummy.calledWith(false);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });
      });
    });

    context(".args(count)", () => {
      context("dummy not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const myDummy = dummy();

          // When
          let error = null;
          try {
            myDummy.args(0);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("dummy called", () => {
        context("count not defined", () => {
          it("returns args of last call", () => {
            // Given
            const myDummy = dummy();
            myDummy({ foo: "foo", bar: "bar" });
            myDummy({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

            // When
            const args = myDummy.args();

            // Then
            expect(args).to.eql([{ foo: "foo", bar: "bar" }, ["foo", "bar"]]);
          });
        });

        context("count defined", () => {
          context("count is not valid: count < 1 || count > callCount", () => {
            it("throws a 'count not valid' error", () => {
              // Given
              const myDummy = dummy();
              myDummy();
              myDummy();

              // When
              let error = null;
              try {
                myDummy.args(10);
              } catch (e) {
                error = e;
              }

              // Then
              expect(error).to.equal("count not valid");
            });
          });

          context("count is valid", () => {
            it("returns args of the call represented by the count", () => {
              // Given
              const myDummy = dummy();
              myDummy({ foo: "foo", bar: "bar" });

              // When
              const args = myDummy.args(1);

              // Then
              expect(args).to.eql([{ foo: "foo", bar: "bar" }]);
            });
          });
        });
      });
    });

    context(".inspect(count)", () => {
      context("dummy not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const myDummy = dummy();

          // When
          let error = null;
          try {
            myDummy.inspect(1);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("dummy called", () => {
        context("count is not valid: count < 1 || count > callCount", () => {
          it("throws a 'count not valid' error", () => {
            // Given
            const myDummy = dummy();
            myDummy();
            myDummy();

            // When
            let error = null;
            try {
              myDummy.inspect(10);
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("count not valid");
          });
        });

        it("returns an object represting a given call count", () => {
          // Given
          const myDummy = dummy();
          myDummy(["foo"]);

          // When
          const { args, calledWith } = myDummy.inspect(1);

          // Then
          expect(args).to.be.an("array");
          expect(calledWith).to.be.a("function");
        });

        context(".inspect(1)", () => {
          it("returns args of the first call", () => {
            // Given
            const myDummy = dummy();
            myDummy(["foo"]);
            myDummy(["bar"]);

            // When
            const { args } = myDummy.inspect(1);

            // Then
            expect(args).to.eql([["foo"]]);
          });

          context(".inspect(1).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for first call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);

              // When
              const calledWithArgs = myDummy.inspect(1).calledWith(["foo"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);

              // When
              const calledWithArgs = myDummy.inspect(1).calledWith(["foo "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(2)", () => {
          it("returns args of the second call", () => {
            // Given
            const myDummy = dummy();
            myDummy(["foo"]);
            myDummy(["bar"]);

            // When
            const { args } = myDummy.inspect(2);

            // Then
            expect(args).to.eql([["bar"]]);
          });

          context(".inspect(2).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the second call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);

              // When
              const calledWithArgs = myDummy.inspect(2).calledWith(["bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);

              // When
              const calledWithArgs = myDummy.inspect(2).calledWith(["bar "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(n)", () => {
          it("returns args of the nth call", () => {
            // Given
            const myDummy = dummy();
            myDummy(["foo"]);
            myDummy(["bar"]);
            myDummy(["hello"]);
            myDummy(["world"]);

            // When
            const { args } = myDummy.inspect(4);

            // Then
            expect(args).to.eql([["world"]]);
          });

          context(".inspect(n).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the nth call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);
              myDummy(["second foo"]);
              myDummy(["second bar"]);
              myDummy(["hello"]);
              myDummy(["world"]);

              // When
              const calledWithArgs = myDummy
                .inspect(4)
                .calledWith(["second bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const myDummy = dummy();
              myDummy(["foo"]);
              myDummy(["bar"]);

              // When
              const calledWithArgs = myDummy.inspect(2).calledWith(["bar "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });
      });
    });

    context(".reset()", () => {
      it("resets callCount to zero", () => {
        // Given
        const myDummy = dummy();
        myDummy({ foo: "foo", bar: "bar" });
        myDummy({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

        // When
        myDummy.reset();

        // Then
        expect(myDummy.callCount()).to.equal(0);
      });
    });
  });
});

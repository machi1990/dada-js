const { expect } = require("chai");
const stub = require("../src/stub");

describe("Stubs", () => {
  context(".stub(obj, stubFnName)", () => {
    context(".callCount()", () => {
      context("not called", () => {
        it("returns zero", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // Then
          expect(stubbed.callCount()).to.equal(0);
        });

        context(".notCalled()", () => {
          it("returns true", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            // When
            const stubbed = stub(obj, "stub");

            // Then
            expect(stubbed.notCalled()).to.equal(true);
          });
        });
      });

      context("called one time", () => {
        it("returns one", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          // Then
          expect(stubbed.callCount()).to.equal(1);
        });

        context(".notCalled()", () => {
          it("returns false", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            // When
            const stubbed = stub(obj, "stub");
            obj.stub();
            // Then
            expect(stubbed.notCalled()).to.equal(false);
          });
        });
      });

      context("called two times", () => {
        it("returns two", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.callCount()).to.equal(2);
        });
      });

      context("called three times", () => {
        it("returns three", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.callCount()).to.equal(3);
        });
      });

      context("called more than three times", () => {
        it("returns the number of time the stub was called", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();
          obj.stub();
          obj.stub();
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.callCount()).to.equal(6);
        });
      });
    });

    context(".calledOnce()", () => {
      context("called once", () => {
        it("returns true", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          // Then
          expect(stubbed.calledOnce()).to.equal(true);
        });
      });

      context("not called once", () => {
        it("returns false", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledTwice()", () => {
      context("called twice", () => {
        it("returns true", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.calledTwice()).to.equal(true);
        });
      });

      context("not called twice", () => {
        it("returns false", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledThrice()", () => {
      context("called thrice", () => {
        it("returns true", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();
          obj.stub();
          obj.stub();

          // Then
          expect(stubbed.calledThrice()).to.equal(true);
        });
      });

      context("not called thrice", () => {
        it("returns false", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          obj.stub();

          // Then
          expect(stubbed.calledThrice()).to.equal(false);
        });
      });
    });

    context(".calledWith(args)", () => {
      context("stub not called", () => {
        it("returns false", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          const calledWithArgs = stubbed.calledWith({});

          // Then
          expect(calledWithArgs).to.equal(false);
        });
      });

      context("stub called", () => {
        context("stub called without arguments", () => {
          it("returns false", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const stubbed = stub(obj, "stub");
            obj.stub();

            // When
            const calledWithArgs = stubbed.calledWith();

            // Then
            expect(calledWithArgs).to.equal(true);
          });
        });

        context("stub called with arguments", () => {
          context("stub called with exact arguments", () => {
            context("arguments list contains only primitive types", () => {
              it("returns true", () => {
                // Given
                const obj = {
                  stub: () => {}
                };
                const stubbed = stub(obj, "stub");
                obj.stub(true);

                // When
                const calledWithArgs = stubbed.calledWith(true);

                // Then
                expect(calledWithArgs).to.equal(true);
              });
            });

            context(
              "arguments list contains object, array, and primitive types",
              () => {
                it("returns true", () => {
                  // Given
                  const obj = {
                    stub: () => {}
                  };

                  const stubbed = stub(obj, "stub");
                  obj.stub({}, true, []);

                  // When
                  const calledWithArgs = stubbed.calledWith({}, true, []);

                  // Then
                  expect(calledWithArgs).to.equal(true);
                });
              }
            );
          });

          context("stub not called with exact arguments", () => {
            it("returns false", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub(true);

              // When
              const calledWithArgs = stubbed.calledWith(false);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });
      });
    });

    context(".args(count)", () => {
      context("stub not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          let error = null;
          try {
            stubbed.args(0);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("stub called", () => {
        context("count not defined", () => {
          it("returns args of last call", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const stubbed = stub(obj, "stub");
            obj.stub({ foo: "foo", bar: "bar" });
            obj.stub({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

            // When
            const args = stubbed.args();

            // Then
            expect(args).to.eql([{ foo: "foo", bar: "bar" }, ["foo", "bar"]]);
          });
        });

        context("count defined", () => {
          context("count is not valid: count < 1 || count > callCount", () => {
            it("throws a 'count not valid' error", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub();
              obj.stub();

              // When
              let error = null;
              try {
                stubbed.args(10);
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
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub({ foo: "foo", bar: "bar" });

              // When
              const args = stubbed.args(1);

              // Then
              expect(args).to.eql([{ foo: "foo", bar: "bar" }]);
            });
          });
        });
      });
    });

    context(".inspect(count)", () => {
      context("stub not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          let error = null;
          try {
            stubbed.inspect(1);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("stub called", () => {
        context("count is not valid: count < 1 || count > callCount", () => {
          it("throws a 'count not valid' error", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const stubbed = stub(obj, "stub");
            obj.stub();
            obj.stub();

            // When
            let error = null;
            try {
              stubbed.inspect(10);
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("count not valid");
          });
        });

        it("returns an object represting a given call count", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");
          obj.stub(["foo"]);

          // When
          const { args, calledWith } = stubbed.inspect(1);

          // Then
          expect(args).to.be.an("array");
          expect(calledWith).to.be.a("function");
        });

        context(".inspect(1)", () => {
          it("returns args of the first call", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const stubbed = stub(obj, "stub");
            obj.stub(["foo"]);
            obj.stub(["bar"]);

            // When
            const { args } = stubbed.inspect(1);

            // Then
            expect(args).to.eql([["foo"]]);
          });

          context(".inspect(1).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for first call", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);

              // When
              const calledWithArgs = stubbed.inspect(1).calledWith(["foo"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);

              // When
              const calledWithArgs = stubbed.inspect(1).calledWith(["foo "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(2)", () => {
          it("returns args of the second call", () => {
            // Given
            const obj = {
              stub: () => {}
            };

            const stubbed = stub(obj, "stub");
            obj.stub(["foo"]);
            obj.stub(["bar"]);

            // When
            const { args } = stubbed.inspect(2);

            // Then
            expect(args).to.eql([["bar"]]);
          });

          context(".inspect(2).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the second call", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);

              // When
              const calledWithArgs = stubbed.inspect(2).calledWith(["bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                stub: () => {}
              };

              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);

              // When
              const calledWithArgs = stubbed.inspect(2).calledWith(["bar "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(n)", () => {
          it("returns args of the nth call", () => {
            // Given
            const obj = {
              stub: () => {}
            };

            const stubbed = stub(obj, "stub");
            obj.stub(["foo"]);
            obj.stub(["bar"]);
            obj.stub(["hello"]);
            obj.stub(["world"]);

            // When
            const { args } = stubbed.inspect(4);

            // Then
            expect(args).to.eql([["world"]]);
          });

          context(".inspect(n).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the nth call", () => {
              // Given
              const obj = {
                stub: () => {}
              };
              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);
              obj.stub(["second foo"]);
              obj.stub(["second bar"]);
              obj.stub(["hello"]);
              obj.stub(["world"]);

              // When
              const calledWithArgs = stubbed
                .inspect(4)
                .calledWith(["second bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                stub: () => {}
              };

              const stubbed = stub(obj, "stub");
              obj.stub(["foo"]);
              obj.stub(["bar"]);

              // When
              const calledWithArgs = stubbed.inspect(2).calledWith(["bar "]);

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
        const obj = {
          stub: () => {}
        };
        const stubbed = stub(obj, "stub");
        obj.stub({ foo: "foo", bar: "bar" });
        obj.stub({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

        // When
        stubbed.reset();

        // Then
        expect(stubbed.callCount()).to.equal(0);
      });

      it("remove all args records", () => {
        // Given
        const obj = {
          stub: () => {}
        };
        const stubbed = stub(obj, "stub");
        obj.stub({ foo: "foo", bar: "bar" });
        obj.stub({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

        stubbed
          .returns("hi")
          .when("en")
          .returns("hello world")
          .when("fr")
          .returns("bonjour le monde")
          .when("sw")
          .returns("jambo dunia")
          .when()
          .throws("You must supply language argument");

        // When
        stubbed.reset();

        // Then
        const hi = obj.stub("ch");
        const en = obj.stub("en");
        const fr = obj.stub("fr");
        const sw = obj.stub("sw");
        const shouldNotThrow = obj.stub();

        expect(hi).to.equal(undefined);
        expect(en).to.equal(undefined);
        expect(fr).to.equal(undefined);
        expect(sw).to.equal(undefined);
        expect(shouldNotThrow).to.equal(undefined);
      });
    });

    context(".returns(value)", () => {
      context("not called after creation", () => {
        it("returns undefined", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          stub(obj, "stub");

          // When
          const value = obj.stub();

          // Then
          expect(value).to.equal(undefined);
        });
      });

      context("called once with a given value after creation", () => {
        it("returns a fluent stubbed object", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          const stubbed = stub(obj, "stub");

          // When
          const fluentStubbed = stubbed.returns("foobar");

          // Then
          expect(fluentStubbed.when).to.be.a("function");
          expect(fluentStubbed.args).to.be.a("function");
          expect(fluentStubbed.reset).to.be.a("function");
          expect(fluentStubbed.inspect).to.be.a("function");
          expect(fluentStubbed.callCount).to.be.a("function");
          expect(fluentStubbed.calledWith).to.be.a("function");
          expect(fluentStubbed.calledOnce).to.be.a("function");
          expect(fluentStubbed.calledTwice).to.be.a("function");
          expect(fluentStubbed.calledThrice).to.be.a("function");
        });

        it("returns the given value during invocation of stub", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          stub(obj, "stub").returns("foobar");

          // When
          const value = obj.stub({ foo: "foo", bar: "bar" });

          // Then
          expect(value).to.equal("foobar");
        });
      });

      context(
        "called more than once with a different values after creation",
        () => {
          it("returns the last supplied value during invocation of stub", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const stubbed = stub(obj, "stub");
            stubbed.returns("foo");
            stubbed.returns("bar");
            stubbed.returns("foobar");

            // When
            const value = obj.stub({ foo: "foo", bar: "bar" });

            // Then
            expect(value).to.equal("foobar");
          });
        }
      );
    });

    context(".throws(error)", () => {
      context("not called after creation", () => {
        it("returns undefined", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          stub(obj, "stub");

          // When
          const value = obj.stub();

          // Then
          expect(value).to.equal(undefined);
        });
      });

      context("called once with a given value after creation", () => {
        it("returns an object containing `when` and test double inspection methods", () => {
          // Given
          const obj = {
            stub: () => {}
          };

          // When
          const fluentStubbed = stub(obj, "stub").throws("foobar");

          // Then
          expect(fluentStubbed.when).to.be.a("function");
          expect(fluentStubbed.args).to.be.a("function");
          expect(fluentStubbed.reset).to.be.a("function");
          expect(fluentStubbed.inspect).to.be.a("function");
          expect(fluentStubbed.callCount).to.be.a("function");
          expect(fluentStubbed.calledWith).to.be.a("function");
          expect(fluentStubbed.calledOnce).to.be.a("function");
          expect(fluentStubbed.calledTwice).to.be.a("function");
          expect(fluentStubbed.calledThrice).to.be.a("function");
        });

        it("returns the given value during invocation of stub", () => {
          // Given
          const obj = {
            stub: () => {}
          };
          stub(obj, "stub").throws("stub error");

          // When
          let error = null;
          try {
            obj.stub({ foo: "foo", bar: "bar" });
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("stub error");
        });
      });

      context(
        "called more than once with a different values after creation",
        () => {
          it("returns the last supplied value during invocation of stub", () => {
            // Given
            const obj = {
              stub: () => {}
            };

            const stubbed = stub(obj, "stub");
            stubbed.throws("foo error");
            stubbed.throws("bar error");
            stubbed.throws("foobar error");

            // When
            let error = null;
            try {
              obj.stub({ foo: "foo", bar: "bar" });
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("foobar error");
          });
        }
      );
    });

    context(".when(args)", () => {
      context("called once without a call to returns or throws", () => {
        context("stub throws global error", () => {
          it("register the value and throws with the global error during invocation of stub with arg.", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const firstArg = "foo";
            const secondArg = "bar";
            stub(obj, "stub")
              .throws("global error")
              .when(firstArg, secondArg);

            // When
            let error = null;
            try {
              obj.stub(firstArg, secondArg);
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("global error");
          });
        });

        context("stub returns global value ", () => {
          it("registers the arg value, and returns the global value during invocation of stub with arg.", () => {
            // Given
            const obj = {
              stub: () => {}
            };
            const firstArg = "foo";
            const secondArg = "bar";
            stub(obj, "stub")
              .returns(["not", "with", "foo", "bar"])
              .when(firstArg, secondArg);

            // When
            const value = obj.stub(firstArg, secondArg);

            // Then
            expect(value).to.eql(["not", "with", "foo", "bar"]);
          });
        });
      });

      context("called once with arg followed by a call to returns", () => {
        it("registers the arg value, and returns the value supplied in the last call of return construct during invocation with arg.", () => {
          // Given
          const obj = {
            stub: () => {}
          };

          const firstArg = "foo";
          const secondArg = "bar";
          stub(obj, "stub")
            .returns(["not", "with", "foo", "bar"])
            .when(firstArg, secondArg)
            .returns("foo-bar")
            .when(secondArg, firstArg)
            .returns("bar-with-foo");

          // When
          const value = obj.stub(firstArg, secondArg);
          // Then
          expect(value).to.equal("foo-bar");
        });

        it("registers the arg value, and returns the global value during invocation with any other arg.", () => {
          // Given
          const obj = {
            stub: () => {}
          };

          const firstArg = "foo";
          const secondArg = "bar";
          stub(obj, "stub")
            .returns(["not", "with", "foo", "bar"])
            .when(firstArg, secondArg)
            .returns("foo-with-bar");

          // When
          const value = obj.stub("hello", "world");

          // Then
          expect(value).to.eql(["not", "with", "foo", "bar"]);
        });
      });

      context("called once with arg followed by a call to throws", () => {
        it("registers the arg value, and throws the value supplied in the last of throws construct during invocation with arg.", () => {
          // Given
          const obj = {
            stub: () => {}
          };

          const firstArg = "foo";
          const secondArg = "bar";
          stub(obj, "stub")
            .returns(["not", "with", "foo", "bar"])
            .when(firstArg, secondArg)
            .throws("cannot read foo-bar of undefined");

          // When
          let error = null;
          try {
            obj.stub(firstArg, secondArg);
          } catch (e) {
            error = e;
          }
          // Then
          expect(error).to.equal("cannot read foo-bar of undefined");
        });

        it("registers the arg value, and throws the global error during invocation with any other arg.", () => {
          // Given
          const obj = {
            stub: () => {}
          };

          const firstArg = "foo";
          const secondArg = "bar";
          stub(obj, "stub")
            .throws("cannot read foo and bar")
            .when(firstArg, secondArg)
            .throws("foo-without-bar");

          // When
          let error = null;
          try {
            obj.stub("hello", "world");
          } catch (e) {
            error = e;
          }
          // Then
          expect(error).to.equal("cannot read foo and bar");
        });
      });

      context(
        "same args record twice followed by returns and a throws construct",
        () => {
          context("throws construct called after returns construct", () => {
            it("throws the error provided in the last throws construct", () => {
              // Given
              const obj = {
                stub: () => {}
              };

              const firstArg = "foo";
              const secondArg = "bar";
              stub(obj, "stub")
                .when(firstArg, secondArg)
                .returns("foo-bar")
                .when(firstArg, secondArg)
                .throws("cannot read foo-bar of undefined");

              // When
              let error = null;
              try {
                obj.stub(firstArg, secondArg);
              } catch (e) {
                error = e;
              }
              // Then
              expect(error).to.equal("cannot read foo-bar of undefined");
            });
          });

          context("returns construct called after throws construct", () => {
            it("returns the value provided in the last returns construct", () => {
              // Given
              const obj = {
                stub: () => {}
              };

              const firstArg = "foo";
              const secondArg = "bar";
              stub(obj, "stub")
                .when(firstArg, secondArg)
                .throws("cannot read foo-bar of undefined")
                .when(firstArg, secondArg)
                .returns("foo-bar");

              // When

              const value = obj.stub(firstArg, secondArg);

              // Then
              expect(value).to.equal("foo-bar");
            });
          });
        }
      );
    });

    context("fluency", () => {
      it("is fluent", () => {
        // Given
        const obj = {
          stub: () => {}
        };

        // When
        const stubbed = stub(obj, "stub")
          .throws("foobar")
          .when()
          .returns("called without arguments")
          .when("foo", "bar")
          .returns("FOO-BAR")
          .when("hello")
          .throws("world does not exist");

        obj.stub();
        obj.stub("foo", "bar");

        let error = null;
        try {
          obj.stub("hello");
        } catch (e) {
          error = e;
        }

        // Then
        expect(stubbed.args(1)).to.eql([]);
        expect(stubbed.callCount()).to.equal(3);
        expect(stubbed.inspect(2).calledWith("foo", "bar")).to.equal(true);
        expect(stubbed.calledWith("hello")).to.equal(true);
        expect(stubbed.calledOnce()).to.equal(false);
        expect(stubbed.calledTwice()).to.equal(false);
        expect(stubbed.calledThrice()).to.equal(true);
      });
    });
  });
});

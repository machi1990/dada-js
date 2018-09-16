const { expect } = require("chai");

describe("Spy", () => {
  const spy = require("../src/spy");
  context(".spy(obj, spyFnName)", () => {
    context("spyFnName property does not exist", () => {
      it("throws an 'undefined function' error", () => {
        // Given
        const obj = {
          fn: () => {}
        };

        const spyFnName = "fn_";

        // When
        let error = null;

        try {
          spy(obj, spyFnName);
        } catch (e) {
          error = e;
        }

        // Then
        expect(error).to.equal("undefined function");
      });
    });

    context("spyFnName property is not a function", () => {
      it("throws an 'property is not a function' error", () => {
        // Given
        const obj = {
          fn: "not a function"
        };
        const spyFnName = "fn";

        // When
        let error = null;

        try {
          spy(obj, spyFnName);
        } catch (e) {
          error = e;
        }

        // Then
        expect(error).to.equal("property is not a function");
      });
    });

    context("went undecovering", () => {
      it("does not modify target implementation", () => {
        // Given
        const helloWorld = () => "hello world";
        const obj = {
          fn: helloWorld
        };

        const spied = spy(obj, "fn");
        const internalImplementationResult = helloWorld();

        // When
        const result = obj.fn();
        // Then
        expect(result).to.eql(internalImplementationResult);
      });

      context(".callCount()", () => {
        context("not called", () => {
          it("returns zero", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When

            // Then
            expect(spied.callCount()).to.equal(0);
          });
        });

        context("called one time", () => {
          it("returns one", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            // Then
            expect(spied.callCount()).to.equal(1);
          });
        });

        context("called two times", () => {
          it("returns two", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();

            // Then
            expect(spied.callCount()).to.equal(2);
          });
        });

        context("called three times", () => {
          it("returns three", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();
            obj.fn();

            // Then
            expect(spied.callCount()).to.equal(3);
          });
        });

        context("called more than three times", () => {
          it("returns the number of time the spy was called", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();
            obj.fn();
            obj.fn();
            obj.fn();
            obj.fn();

            // Then
            expect(spied.callCount()).to.equal(6);
          });
        });
      });

      context(".calledOnce()", () => {
        context("called once", () => {
          it("returns true", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            // Then
            expect(spied.calledOnce()).to.equal(true);
          });
        });

        context("not called once", () => {
          it("returns false", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();
            obj.fn();

            // Then
            expect(spied.calledTwice()).to.equal(false);
          });
        });
      });

      context(".calledTwice()", () => {
        context("called twice", () => {
          it("returns true", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();

            // Then
            expect(spied.calledTwice()).to.equal(true);
          });
        });

        context("not called twice", () => {
          it("returns false", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();
            obj.fn();

            // Then
            expect(spied.calledTwice()).to.equal(false);
          });
        });
      });

      context(".calledThrice()", () => {
        context("called thrice", () => {
          it("returns true", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();
            obj.fn();
            obj.fn();

            // Then
            expect(spied.calledThrice()).to.equal(true);
          });
        });

        context("not called thrice", () => {
          it("returns false", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            obj.fn();

            // Then
            expect(spied.calledThrice()).to.equal(false);
          });
        });
      });

      context(".calledWith(args)", () => {
        context("spy not called", () => {
          it("returns false", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            const calledWithArgs = spied.calledWith({});

            // Then
            expect(calledWithArgs).to.equal(false);
          });
        });

        context("spy called", () => {
          context("spy called without arguments", () => {
            it("returns false", () => {
              // Given
              const obj = {
                fn: () => {}
              };
              const spied = spy(obj, "fn");
              obj.fn();

              // When
              const calledWithArgs = spied.calledWith();

              // Then
              expect(calledWithArgs).to.equal(true);
            });
          });

          context("spy called with arguments", () => {
            context("spy called with exact arguments", () => {
              context("arguments list contains only primitive types", () => {
                it("returns true", () => {
                  // Given
                  const obj = {
                    fn: () => {}
                  };
                  const spied = spy(obj, "fn");
                  obj.fn(true);

                  // When
                  const calledWithArgs = spied.calledWith(true);

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
                      fn: () => {}
                    };

                    const spied = spy(obj, "fn");
                    obj.fn({}, true, []);

                    // When
                    const calledWithArgs = spied.calledWith({}, true, []);

                    // Then
                    expect(calledWithArgs).to.equal(true);
                  });
                }
              );
            });

            context("spy not called with exact arguments", () => {
              it("returns false", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn(true);

                // When
                const calledWithArgs = spied.calledWith(false);

                // Then
                expect(calledWithArgs).to.equal(false);
              });
            });
          });
        });
      });

      context(".args(count)", () => {
        context("spy not called", () => {
          it("throws a 'test double is yet to be called' error", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            let error = null;
            try {
              spied.args(0);
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("test double is yet to be called");
          });
        });

        context("spy called", () => {
          context("count not defined", () => {
            it("returns args of last call", () => {
              // Given
              const obj = {
                fn: () => {}
              };
              const spied = spy(obj, "fn");
              obj.fn({ foo: "foo", bar: "bar" });
              obj.fn({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

              // When
              const args = spied.args();

              // Then
              expect(args).to.eql([{ foo: "foo", bar: "bar" }, ["foo", "bar"]]);
            });
          });

          context("count defined", () => {
            context(
              "count is not valid: count < 1 || count > callCount",
              () => {
                it("throws a 'count not valid' error", () => {
                  // Given
                  const obj = {
                    fn: () => {}
                  };
                  const spied = spy(obj, "fn");
                  obj.fn();
                  obj.fn();

                  // When
                  let error = null;
                  try {
                    spied.args(10);
                  } catch (e) {
                    error = e;
                  }

                  // Then
                  expect(error).to.equal("count not valid");
                });
              }
            );

            context("count is valid", () => {
              it("returns args of the call represented by the count", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn({ foo: "foo", bar: "bar" });

                // When
                const args = spied.args(1);

                // Then
                expect(args).to.eql([{ foo: "foo", bar: "bar" }]);
              });
            });
          });
        });
      });

      context(".inspect(count)", () => {
        context("spy not called", () => {
          it("throws a 'test double is yet to be called' error", () => {
            // Given
            const obj = {
              fn: () => {}
            };
            const spied = spy(obj, "fn");

            // When
            let error = null;
            try {
              spied.inspect(1);
            } catch (e) {
              error = e;
            }

            // Then
            expect(error).to.equal("test double is yet to be called");
          });
        });

        context("spy called", () => {
          context("count is not valid: count < 1 || count > callCount", () => {
            it("throws a 'count not valid' error", () => {
              // Given
              const obj = {
                fn: () => {}
              };
              const spied = spy(obj, "fn");
              obj.fn();
              obj.fn();

              // When
              let error = null;
              try {
                spied.inspect(10);
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
              fn: () => {}
            };
            const spied = spy(obj, "fn");
            obj.fn(["foo"]);

            // When
            const { args, calledWith } = spied.inspect(1);

            // Then
            expect(args).to.be.an("array");
            expect(calledWith).to.be.a("function");
          });

          context(".inspect(1)", () => {
            it("returns args of the first call", () => {
              // Given
              const obj = {
                fn: () => {}
              };
              const spied = spy(obj, "fn");
              obj.fn(["foo"]);
              obj.fn(["bar"]);

              // When
              const { args } = spied.inspect(1);

              // Then
              expect(args).to.eql([["foo"]]);
            });

            context(".inspect(1).calledWith(args)", () => {
              it("returns true during invocation of calledWith with good arguments for first call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);

                // When
                const calledWithArgs = spied.inspect(1).calledWith(["foo"]);

                // Then
                expect(calledWithArgs).to.equal(true);
              });

              it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);

                // When
                const calledWithArgs = spied.inspect(1).calledWith(["foo "]);

                // Then
                expect(calledWithArgs).to.equal(false);
              });
            });
          });

          context(".inspect(2)", () => {
            it("returns args of the second call", () => {
              // Given
              const obj = {
                fn: () => {}
              };

              const spied = spy(obj, "fn");
              obj.fn(["foo"]);
              obj.fn(["bar"]);

              // When
              const { args } = spied.inspect(2);

              // Then
              expect(args).to.eql([["bar"]]);
            });

            context(".inspect(2).calledWith(args)", () => {
              it("returns true during invocation of calledWith with good arguments for the second call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);

                // When
                const calledWithArgs = spied.inspect(2).calledWith(["bar"]);

                // Then
                expect(calledWithArgs).to.equal(true);
              });

              it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };

                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);

                // When
                const calledWithArgs = spied.inspect(2).calledWith(["bar "]);

                // Then
                expect(calledWithArgs).to.equal(false);
              });
            });
          });

          context(".inspect(n)", () => {
            it("returns args of the nth call", () => {
              // Given
              const obj = {
                fn: () => {}
              };

              const spied = spy(obj, "fn");
              obj.fn(["foo"]);
              obj.fn(["bar"]);
              obj.fn(["hello"]);
              obj.fn(["world"]);

              // When
              const { args } = spied.inspect(4);

              // Then
              expect(args).to.eql([["world"]]);
            });

            context(".inspect(n).calledWith(args)", () => {
              it("returns true during invocation of calledWith with good arguments for the nth call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };
                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);
                obj.fn(["second foo"]);
                obj.fn(["second bar"]);
                obj.fn(["hello"]);
                obj.fn(["world"]);

                // When
                const calledWithArgs = spied
                  .inspect(4)
                  .calledWith(["second bar"]);

                // Then
                expect(calledWithArgs).to.equal(true);
              });

              it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
                // Given
                const obj = {
                  fn: () => {}
                };

                const spied = spy(obj, "fn");
                obj.fn(["foo"]);
                obj.fn(["bar"]);

                // When
                const calledWithArgs = spied.inspect(2).calledWith(["bar "]);

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
            fn: () => {}
          };
          const spied = spy(obj, "fn");
          obj.fn({ foo: "foo", bar: "bar" });
          obj.fn({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

          // When
          spied.reset();

          // Then
          expect(spied.callCount()).to.eql(0);
        });
      });
    });
  });
});

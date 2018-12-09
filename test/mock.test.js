const { expect } = require("chai");
const mock = require("../src/mock");
describe("Mocks", () => {
  context(".mock(obj, mockFnName)", () => {
    context(".callCount()", () => {
      context("not called", () => {
        it("returns zero", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // Then
          expect(mocked.callCount()).to.equal(0);
        });

        context(".notCalled()", () => {
          it("returns true", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            // When
            const mocked = mock(obj, "mock");

            // Then
            expect(mocked.notCalled()).to.equal(true);
          });
        });
      });

      context("called one time", () => {
        it("returns one", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          // Then
          expect(mocked.callCount()).to.equal(1);
        });

        context(".notCalled()", () => {
          it("returns false", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            // When
            const mocked = mock(obj, "mock");
            obj.mock();
            // Then
            expect(mocked.notCalled()).to.equal(false);
          });
        });
      });

      context("called two times", () => {
        it("returns two", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.callCount()).to.equal(2);
        });
      });

      context("called three times", () => {
        it("returns three", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.callCount()).to.equal(3);
        });
      });

      context("called more than three times", () => {
        it("returns the number of time the mock was called", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();
          obj.mock();
          obj.mock();
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.callCount()).to.equal(6);
        });
      });
    });

    context(".calledOnce()", () => {
      context("called once", () => {
        it("returns true", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          // Then
          expect(mocked.calledOnce()).to.equal(true);
        });
      });

      context("not called once", () => {
        it("returns false", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledTwice()", () => {
      context("called twice", () => {
        it("returns true", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.calledTwice()).to.equal(true);
        });
      });

      context("not called twice", () => {
        it("returns false", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.calledTwice()).to.equal(false);
        });
      });
    });

    context(".calledThrice()", () => {
      context("called thrice", () => {
        it("returns true", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();
          obj.mock();
          obj.mock();

          // Then
          expect(mocked.calledThrice()).to.equal(true);
        });
      });

      context("not called thrice", () => {
        it("returns false", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          obj.mock();

          // Then
          expect(mocked.calledThrice()).to.equal(false);
        });
      });
    });

    context(".calledWith(args)", () => {
      context("mock not called", () => {
        it("returns false", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          const calledWithArgs = mocked.calledWith({});

          // Then
          expect(calledWithArgs).to.equal(false);
        });
      });

      context("mock called", () => {
        context("mock called without arguments", () => {
          it("returns false", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            const mocked = mock(obj, "mock");
            obj.mock();

            // When
            const calledWithArgs = mocked.calledWith();

            // Then
            expect(calledWithArgs).to.equal(true);
          });
        });

        context("mock called with arguments", () => {
          context("mock called with exact arguments", () => {
            context("arguments list contains only primitive types", () => {
              it("returns true", () => {
                // Given
                const obj = {
                  mock: () => {}
                };
                const mocked = mock(obj, "mock");
                obj.mock(true);

                // When
                const calledWithArgs = mocked.calledWith(true);

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
                    mock: () => {}
                  };

                  const mocked = mock(obj, "mock");
                  obj.mock({}, true, []);

                  // When
                  const calledWithArgs = mocked.calledWith({}, true, []);

                  // Then
                  expect(calledWithArgs).to.equal(true);
                });
              }
            );
          });

          context("mock not called with exact arguments", () => {
            it("returns false", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock(true);

              // When
              const calledWithArgs = mocked.calledWith(false);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });
      });
    });

    context(".args(count)", () => {
      context("mock not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          let error = null;
          try {
            mocked.args(0);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("mock called", () => {
        context("count not defined", () => {
          it("returns args of last call", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            const mocked = mock(obj, "mock");
            obj.mock({ foo: "foo", bar: "bar" });
            obj.mock({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

            // When
            const args = mocked.args();

            // Then
            expect(args).to.eql([{ foo: "foo", bar: "bar" }, ["foo", "bar"]]);
          });
        });

        context("count defined", () => {
          context("count is not valid: count < 1 || count > callCount", () => {
            it("throws a 'count not valid' error", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock();
              obj.mock();

              // When
              let error = null;
              try {
                mocked.args(10);
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
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock({ foo: "foo", bar: "bar" });

              // When
              const args = mocked.args(1);

              // Then
              expect(args).to.eql([{ foo: "foo", bar: "bar" }]);
            });
          });
        });
      });
    });

    context(".inspect(count)", () => {
      context("mock not called", () => {
        it("throws a 'test double is yet to be called' error", () => {
          // Given
          const obj = {
            mock: () => {}
          };
          const mocked = mock(obj, "mock");

          // When
          let error = null;
          try {
            mocked.inspect(1);
          } catch (e) {
            error = e;
          }

          // Then
          expect(error).to.equal("test double is yet to be called");
        });
      });

      context("mock called", () => {
        context("count is not valid: count < 1 || count > callCount", () => {
          it("throws a 'count not valid' error", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            const mocked = mock(obj, "mock");
            obj.mock();
            obj.mock();

            // When
            let error = null;
            try {
              mocked.inspect(10);
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
            mock: () => {}
          };
          const mocked = mock(obj, "mock");
          obj.mock(["foo"]);

          // When
          const { args, calledWith } = mocked.inspect(1);

          // Then
          expect(args).to.be.an("array");
          expect(calledWith).to.be.a("function");
        });

        context(".inspect(1)", () => {
          it("returns args of the first call", () => {
            // Given
            const obj = {
              mock: () => {}
            };
            const mocked = mock(obj, "mock");
            obj.mock(["foo"]);
            obj.mock(["bar"]);

            // When
            const { args } = mocked.inspect(1);

            // Then
            expect(args).to.eql([["foo"]]);
          });

          context(".inspect(1).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for first call", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);

              // When
              const calledWithArgs = mocked.inspect(1).calledWith(["foo"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);

              // When
              const calledWithArgs = mocked.inspect(1).calledWith(["foo "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(2)", () => {
          it("returns args of the second call", () => {
            // Given
            const obj = {
              mock: () => {}
            };

            const mocked = mock(obj, "mock");
            obj.mock(["foo"]);
            obj.mock(["bar"]);

            // When
            const { args } = mocked.inspect(2);

            // Then
            expect(args).to.eql([["bar"]]);
          });

          context(".inspect(2).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the second call", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);

              // When
              const calledWithArgs = mocked.inspect(2).calledWith(["bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                mock: () => {}
              };

              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);

              // When
              const calledWithArgs = mocked.inspect(2).calledWith(["bar "]);

              // Then
              expect(calledWithArgs).to.equal(false);
            });
          });
        });

        context(".inspect(n)", () => {
          it("returns args of the nth call", () => {
            // Given
            const obj = {
              mock: () => {}
            };

            const mocked = mock(obj, "mock");
            obj.mock(["foo"]);
            obj.mock(["bar"]);
            obj.mock(["hello"]);
            obj.mock(["world"]);

            // When
            const { args } = mocked.inspect(4);

            // Then
            expect(args).to.eql([["world"]]);
          });

          context(".inspect(n).calledWith(args)", () => {
            it("returns true during invocation of calledWith with good arguments for the nth call", () => {
              // Given
              const obj = {
                mock: () => {}
              };
              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);
              obj.mock(["second foo"]);
              obj.mock(["second bar"]);
              obj.mock(["hello"]);
              obj.mock(["world"]);

              // When
              const calledWithArgs = mocked
                .inspect(4)
                .calledWith(["second bar"]);

              // Then
              expect(calledWithArgs).to.equal(true);
            });

            it("returns false during invocation of calledWith with wrong arguments for the given call the first call", () => {
              // Given
              const obj = {
                mock: () => {}
              };

              const mocked = mock(obj, "mock");
              obj.mock(["foo"]);
              obj.mock(["bar"]);

              // When
              const calledWithArgs = mocked.inspect(2).calledWith(["bar "]);

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
          mock: () => {}
        };
        const mocked = mock(obj, "mock");
        obj.mock({ foo: "foo", bar: "bar" });
        obj.mock({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

        // When
        mocked.reset();

        // Then
        expect(mocked.callCount()).to.equal(0);
      });
    });

    context(".revive()", () => {
      it("returns the mock to the original state", () => {
        // Given
        const obj = {
          mock: () => {}
        };

        mock(obj, "mock");
        obj.mock({ foo: "foo", bar: "bar" });
        obj.mock({ foo: "foo", bar: "bar" }, ["foo", "bar"]);

        // When
        obj.mock.revive();

        // Then
        expect(obj.mock).to.be.a("function");
        expect(obj.mock.callCount).to.equal(undefined);
        expect(obj.mock.reset).to.equal(undefined);
      });
    });
  });
});

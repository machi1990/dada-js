/**
 * Creates a dummy function returning a value passed as parameter.
 * The function can be passed around but never actually used.
 * Usually it can be used as a callback.
 * @param {*} of
 */
module.exports = of => {
  return () => of;
};

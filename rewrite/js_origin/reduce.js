Array.prototype.reduce = function (callBack, initValue) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callBack !== 'function') {
    throw new TypeError(`${callBack} is not a function`);
  }
  const o = this;
  let origin = initValue;
  let k = 0;
  if (origin === undefined) {
    if (o.length && o.length > 0) {
      origin = this[k++];
    }
  }

  while (k < o.length) {
    origin = callBack.call(null, origin, o[k], k, o);
    k++;
  }
  return origin;
};

const array1 = [1, 2, 3, 4];
const reducer = (origin, currentValue) => origin + currentValue;
console.log(array1.reduce(reducer, 3));

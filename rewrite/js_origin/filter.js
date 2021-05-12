Array.prototype.filter = function (callback, thisArgs) {
  if (this == undefined) {
    throw new Error('This arr is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new Error(`${callback}callBack is not a function`);
  }

  const o = Object(this);
  const res = [];

  Object.keys(o).forEach(key => {
    if (callback.call(thisArgs, o[key], key, o)) {
      res.push(o[key]);
    }
  });

  return res;
};

Object.prototype.filter = function (callback, thisArgs) {
  if (this == undefined) {
    throw new Error('This arr is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new Error(`${callback}callBack is not a function`);
  }
  // 转化为对象
  const o = Object(this);

  const res = [];

  Object.keys(o).forEach(key => {
    if (callback.call(thisArgs, o[key], key, o)) {
      res.push(o[key]);
    }
  });

  return res;
};

let a = [1, 2, 3, 4, 5, 6, 8, 9, 10];
let b = {
  l: 1,
  m: 2,
  n: 3,
  s: 4,
};
console.log(a.filter(item => item % 2 === 0));
console.log(b.filter(item => item % 2 === 0));

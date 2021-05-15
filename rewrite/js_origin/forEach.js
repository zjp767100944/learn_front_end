Array.prototype.filter = function (callback, thisArgs) {
  if (this == undefined) {
    throw new Error('This arr is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new Error(`${callback}callBack is not a function`);
  }

  const o = Object(this);

  Object.keys(o).forEach(key => {
    callback.call(thisArgs, o[key], key, o);
  });
};

let a = [1, 2, 3, 4, 5, 6, 8, 9, 10];

a.forEach(item => {
  console.log(`${item} is onForEach`);
});

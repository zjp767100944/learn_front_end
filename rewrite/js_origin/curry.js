const curry = fn => {
  const total = fn.prototype.constructor.length;
  let currentArgs = [];
  return function F(...args) {
    currentArgs = [...currentArgs, ...args];
    if (currentArgs.length < total) {
      return F;
    } else {
      return fn.call(null, ...currentArgs);
    }
  };
};

function add(a, b) {
  return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2); // 3

// 假设有一个 curry 函数可以做到柯里化
let addCurry = curry(add);
console.log(addCurry(1)(2)); // 3

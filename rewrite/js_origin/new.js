const newOp = (fn, ...args) => {
  if (typeof fn !== 'function') {
    throw new Error('This is not a function');
  }
  // obj.__proto__ = fn.prototype
  const obj = Object.create(fn.prototype);
  const res = fn.call(obj, ...args);
  // 判断构造函数返回类型
  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  console.log(isObject, isObject);
  return isObject || isFunction ? res : obj;
};

function Car(color, name) {
  this.color = color;
  return {
    name,
  };
}

const o = newOp(Car, 'red', 'audi');
// const o = new Car('red', 'audi');
console.log(o.color);
console.log(o.name);

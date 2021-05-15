Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('This is not a function');
  }
  const self = this;
  let res = function () {
    // 检测 New
    // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
    let _this = this instanceof self ? this : context;
    return self.apply(_this, [...args, ...arguments]);
  };
  // 为了完成 new操作
  // 还需要做一件事情 执行原型 链接
  res.prototype = this.prototype;
  return res;
};

function foo(name) {
  this.name = name;
}
let obj = {};
let bar = foo.bind(obj);
bar('Jack');
console.log(obj.name); // Jack
let alice = new bar('Alice');
console.log(obj.name); // Jack
console.log(alice.name); // Alice

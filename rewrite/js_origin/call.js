Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  // 使用Symbol对象防止命名冲突 例如toString方法
  const fn = Symbol('fn');
  // 在当前上下文定义该方法 然后调用
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};

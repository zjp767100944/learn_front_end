const myInstanceOf = function (obj, source) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  let proto = obj.__proto__;
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === source.__proto__) {
      return true;
    }
    proto = proto.__proto__;
  }
};

const o = { a: 1 };
const o1 = Object.create(o);
console.log(myInstanceOf(o1, {}));

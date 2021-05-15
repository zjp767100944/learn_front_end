const deepCory = obj => {
  const copy = Array.isArray(obj) ? [] : {};

  if (typeof obj === 'object') {
    if (obj === null) {
      return obj;
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            copy[key] = deepCory(obj[key]);
          } else {
            copy[key] = obj[key];
          }
        }
      }
    }
  } else {
    return obj;
  }
  return copy;
};

let o1 = {
  a: 1,
  b: 2,
};

let o2 = deepCory(o1);
o2.a = 2;
console.log('o1', o1);
console.log('o2', o2);

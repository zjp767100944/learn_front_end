const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

const unique = arr => arr.filter((item, index) => arr.indexOf(item) === index);

console.log(unique(arr));

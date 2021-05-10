const flat = arr => {
  const handleFlat = arr => {
    let temp = [];
    for (let i in arr) {
      if (Array.isArray(arr[i])) {
        temp.push(...handleFlat(arr[i]));
      } else {
        temp.push(arr[i]);
      }
    }
    return temp;
  };
  return handleFlat(arr);
};

const arr = [1, [2, [3, [4, 5]]], 6];

console.log(flat(arr));

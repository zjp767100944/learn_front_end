function handleQuickSort(arr, l, r) {
  if (l < r) {
    let p = part(arr, l, r);
    handleQuickSort(arr, l, p - 1);
    handleQuickSort(arr, p + 1, r);
  }
}

function part(arr, l, r) {
  let o = arr[l];
  while (l < r) {
    while (o <= arr[r] && l < r) {
      r--;
    }
    arr[l] = arr[r];
    while (o > arr[l] && l < r) {
      l++;
    }
    arr[r] = arr[l];
  }
  arr[l] = o;
  return l;
}

const quickSort = arr => handleQuickSort(arr, 0, arr.length - 1);
const arr = [2, 1, 5, 7, 2, 4, 9, 8];
quickSort(arr);
console.log(arr);

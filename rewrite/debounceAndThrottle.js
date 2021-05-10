function debounce(fn, time) {
  let timer;
  return function (args) {
    let callNow = !timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
    }, time);
    if (callNow) {
      fn.apply(this, ...args);
    }
  };
}

function throttle(fn, time) {
  let timer;
  return function (args) {
    let callNow = !timer;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
    if (callNow) {
      fn.apply(this, ...args);
    }
  };
}

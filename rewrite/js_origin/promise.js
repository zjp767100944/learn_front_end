const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 更改为解决状态
    const resolve = value => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        // 发布解决态函数
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    // 更改为拒绝状态
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 发布失败态函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 捕获promise内跑抛出的Error
    try {
      executor(resolve, reject);
    } catch (e) {
      console.log('executor');
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function' ?
        onRejected :
        reason => {
          console.log('error');
          throw new Error(reason);
        };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          // 执行当前promise成功的回调有erroe时直接执行新的promise的reject回调
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          // 执行当前promise失败的回调有error时 直接执行新的promise的reject回调
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 订阅 对还在进行中的状态机收集其回调方法
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // 此处try catch原因同上
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });

        this.onRejectedCallbacks.push(() => {
          // 此处try catch原因同上
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }

  catch(errorCallback) {
    // 使用then的执行去实现catch的过程
    return this.then(null, errorCallback);
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  // 执行then内部return的结果和生成的promise2不能是同一个东西
  if (promise2 === x) {
    reject(new TypeError('Chaining Erroe'));
  }

  // 解决重复调用resolve /reject 或者在抛出错误之后还去执行
  let called = false;
  // 判断x为一个对象或者为一个function => 就可能判断x为一个promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // 取x的then的时候可能会抛错
      let { then } = x;
      // 这里就几乎认定x为一个promise
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) {
              return;
            }
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

const p1 = new MyPromise((resolve, reject) => {
  throw new Error('haha');
})
  .then(
    value =>
      new MyPromise((resolve, reject) => {
        reject(1);
      })
  )
  .then(
    value => {},
    e => {
      throw new Error('123');
    }
  );

// const p2 = new Promise((resolve, reject) => {
//   resolve(2);
// })
//   .then(
//     value =>
//       new Promise((resolve, reject) => {
//         reject(1);
//       })
//   )
//   .then(
//     value => {
//       console.log(value);
//     },
//     e => {
//       console.log(1);
//       throw new Error('123');
//     }
//   );

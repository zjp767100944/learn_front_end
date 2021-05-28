let isMount = false;
let workInProgressHook = null;

const fiber = {
  stateNode: App, // 对应App组件
  memorizedState: null, // 保存一条链表
};

// 接受一个初始状态 并返回改状态和一个改变该状态的方法
function useState(initialState) {
  let hook;

  // 用于初始化hook和可以取到hook存储的状态(memoreizedSate)
  if (!isMount) {
    // 初次挂载时的逻辑
    hook = {
      memorizedState: initialState, // 保存状态
      next: null, // 指针指向下一个hook
      queue: {
        pending: null,
      },
    };
    // 第一个执行的hook会走这个逻辑
    // 将fiber节点的用来存储连链表结构的memorized属性指向当前第一个执行的hook
    // 后面再执行hook就会体现一个链表节点连接的逻辑
    if (!fiber.memorizedState) {
      fiber.memorizedState = hook;
      workInProgressHook = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    // 再次更新时的逻辑
    // 将hook指向当前正在执行的hook
    hook = workInProgressHook;
    // 让下次再次执行useState时可以取到下一个hook
    workInProgressHook = workInProgressHook.next;
  }
  // 检出上一次hook的状态
  let baseState = hook.memorizedState;

  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next; // u0

    do {
      const { action } = firstUpdate;
      // () => {}
      baseState = action(baseState);
      // 指针向后遍历后面的action
      firstUpdate = firstUpdate.next;
    } while (firstUpdate.next !== hook.queue.pending);
  }

  hook.queue.pending = null;

  hook.memorizedState = baseState;
  return [baseState, dispatchAction.bind(null, hook.queue)];
}

// setNumber的实现
// ？当前调用的dispacthAction对应哪一个state状态
function dispatchAction(queue, action) {
  // 环状链表
  const update = {
    action,
    next: null,
  };
  // 判断当前hook是否已经有需要触发的更新
  if (queue.pending === null) {
    // 自己指向自己
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedual();
}

function schedual() {
  // 每次重新执行时将正在执行的hook的指针指向fiber的第一个hook
  // 复位 即指向所存储的链表结构的第一个节点
  workInProgressHook = fiber.memorizedState;
  const app = fiber.stateNode();
  isMount = true;
  return app;
}

function App() {
  const [number, setNumber] = useState(0);

  console.log('isMount:', isMount);
  console.log('number', number);
  return {
    onClick() {
      setNumber(number => number + 1);
    },
  };
}

window.app = schedual();
app.onClick();

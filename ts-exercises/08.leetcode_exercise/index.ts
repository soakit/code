interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: "delay",
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    };
  }
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
// type Connect = (module: EffectModule) => any;

// your code start
type Connect = (module: EffectModule) => ExtractContainer<EffectModule>;

type PickFuncKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type ExtractContainer<P> = {
  [K in PickFuncKeys<P>]: P[K] extends (
    arg: Promise<infer T>
  ) => Promise<infer U>
    ? (arg: T) => U
    : P[K] extends (arg: Action<infer T>) => Action<infer U>
    ? (arg: T) => Action<U>
    : never;
};
// your code end

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds(),
  }),
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());

// 解析:
// connect 函数，接收 EffectModule 实例，将它变成另一个对象。
// 这个对象上
// 1) 有EffectModule 的同名方法，但是方法的类型签名被改变了
// 2) 可能有一些任意的非函数属性
// 3) 这个对象（EffectModule 实例）上的方法只可能有两种类型签名

// 需要将作为参数传递进来的 EffectModule 实例上的修改函数类型签名和去掉非函数属性。所以有两件问题要解决：
// a) 如何将非函数属性去掉
// b) 如何转换函数类型签名

// 实现a
type PickFunKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type PickFuns<T> = Pick<T, PickFunKeys<T>>;

interface Todo {
  title: string;
  addTodo(): void;
  removeTodo(): boolean;
}

type TodoFuns = PickFuns<Todo>;
// type TodoFuns = {
//     addTodo: () => void;
//     removeTodo: () => boolean;
// }

const todo: TodoFuns = {
  addTodo() {
    console.log("增加");
  },
  removeTodo() {
    console.log("删除");
    return true;
  },
};

type TodoFunKeys = PickFunKeys<Todo>;
// type TodoFunKeys = "addTodo" | "removeTodo"

// 实现b
/* 
    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  
        变成了
    asyncMethod<T, U>(input: T): Action<U>  
*/
// 怎么才能提取 Promise 泛型中的值?
// (arg: Promise<T>) => Promise<U> 变为 (arg: T) => U;

// 取得范型中的值
type ParamType<T> = T extends ((param: infer P) => any) ? P : T;
// infer P 表示待推断的函数参数。
// 如果 T 能赋值给 (param: infer P) => any，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为 T。

interface User {
  name: string;
  age: number;
}
type Fn = (user: User) => void;

type Param = ParamType<Fn>; // User
// Fn能赋值给 (param: User) => any，则结果是 User，即 type Param = User

type TypeUser = ParamType<User>; // User
type TypeBoolean = ParamType<boolean>; // boolean

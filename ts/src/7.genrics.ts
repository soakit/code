interface People {
  name: string;
  age: number;
}
let person: People = {
  name: "jack",
  age: 18,
};
function pluck<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map((item) => obj[item]);
}
console.log(pluck(person, ["name", "name"])); // ['jack', 'jack']

// typeof
type P1 = typeof person

type Keys = "a" | "b"
type Obj = {
  [p in Keys]: any
} // {a: any, b: any}

// Partial Required Readonly 
type T11 = Partial<People>
type T12 = Required<People>
type T13 = Readonly<People>

// Record
type T0 = Record<'a' | 'b', People>
// -> {a: People, b: People}

// Pick
type T1 = Pick<People, 'name'> // { name: string }

// Exclude
// type Exclude<T, U> = T extends U ? never : T;
// 剔除T中U含有的元素
type T2 = Exclude<
  'a' | 'b' | 'c', 
  'a' | 'b' | 'd'
> // 'c'

// Extract
// type Extract<T, U> = T extends U ? T : never;
// 提取出T包含在U中的元素
type T3 = Extract<
'a' | 'b', 
'a' | 'b' | 'c'
> // 'a' | 'b'

// Omit
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// 忽略对象某些属性（Pick和Exclude进行组合）
// 从People剔除掉name
type T4 = Omit<People, 'name'> // { age: number; }

// 泛型支持递归
// 泛型可以嵌套自己从而形成递归，比如我们最熟悉的单链表的定义就是递归的。
type ListNode<T> = {
  data: T;
  next: ListNode<T> | null;
};
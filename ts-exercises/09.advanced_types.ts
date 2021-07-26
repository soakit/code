type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>; // string | number
type T03 = Extract<string | number | (() => void), Function>; // () => void

type T04 = NonNullable<string | number | undefined>; // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]

function f1(s: string) {
  return { a: 1, b: s };
}
class C {
  x = 0;
  y = 0;
}
type T10 = ReturnType<() => string>; // string
type T11 = ReturnType<(s: string) => void>; // void
type T12 = ReturnType<<T>() => T>; // {}
type T13 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T14 = ReturnType<typeof f1>; // { a: number, b: string }
type T15 = ReturnType<any>; // any
type T16 = ReturnType<never>; // any
type T17 = ReturnType<string>; // Error
type T18 = ReturnType<Function>; // Error

type T20 = InstanceType<typeof C>; // C
type T21 = InstanceType<any>; // any
type T22 = InstanceType<never>; // any
type T23 = InstanceType<string>; // Error
type T24 = InstanceType<Function>; // Error

function getUser(name: string, age: number) {
  return { name, age };
}

// 参数类型不同返回的tuple，转换为union
type ParamsUser = Parameters<typeof getUser>; //  [name: string, age: number]

// tuple转换为union
type ParamsUserUnion = ParamsUser[number]; // string | number

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
// 获取函数的参数类型
type Params = ConstructorParameters<typeof Person>; // [name: string]

const y = { text: "hello" };
const x = { text: "hello" } as const;
/*
const y: {
    text: string;
}

const x: {
    readonly text: "hello";
} 
 */

const m = "t"; // type 't'
let n = "t"; // type string
let o = "t" as const; // type 't'

const setCount = (n: number) => {
  return {
    type: "SET_COUNT",
    payload: n,
  } as const;
};

const resetCount = () => {
  return <const>{
    type: "RESET_COUNT",
  };
};

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;

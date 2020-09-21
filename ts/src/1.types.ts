// 元组
let tuple: [string, number, boolean];
tuple = ["a", 1, false];

// 枚举
enum Roles {
  SUPER_ADMIN, //0
  ADMIN, // 1
  USER, // 2
}

console.log(Roles.SUPER_ADMIN); // 0

// 按顺序编码
enum Roles2 {
  SUPER_ADMIN = 1,
  ADMIN = 3,
  USER, // 4
}

// any与unknown
// unknown 类型只能被赋值给 any 类型和 unknown 类型本身。
// 直观地说，只有能够保存任意类型值的容器才能保存 unknown 类型的值。
let anyValue: any;
let unknownValue: unknown;
let v1: number = anyValue;
let v2: number = unknownValue as number;

v1.toFixed(2);
v2.toFixed(2);

// 默认情况下 null 和 undefined 是所有类型的子类型。
// 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。
// 但，如果你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自的类型。
let u: undefined = undefined;
let n: null = null;

// object 类型,用于表示非原始类型

// ts源码: node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  // ...
}

const proto = {};
Object.create(proto); // OK
Object.create(null); // OK
Object.create(undefined); // ERROR
//   Object.create(1337);      // ERROR
//   Object.create(true);      // ERROR
//   Object.create("oops");    // ERROR

// 1. 尖括号语法
let someVal: any = 'this is a string'
let strLength: number = (<string>someVal).length

// 2. as语法
let someVal2: any = 'this is a string'
let strLength2: number = (someVal as string).length

// 3. 忽略 undefined和null
function myFunc(maybeString: string | undefined | null) {
    const onlyString: String = maybeString
    const ignoreUndefinedAndNull: string = maybeString!; // ok
}

// 4. 调用函数时忽略undefined类型
type NumGenerator = () => number;
function numFunc(numGenerator: NumGenerator | undefined) {
    // const num1 = numGenerator();  // ERROR
    const num2 = numGenerator!();
}

// 5. 确定赋值断言
let x!: number; // 确定赋值断言
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}

// 6. 类型守卫
// in/typeof/instanceof/
// typeof 类型保护只支持两种形式：
// typeof v === "typename" 和 typeof v !== typename，
// "typename" 必须是 "number"， "string"， "boolean" 或 "symbol"。

// 7. 自定义类型保护的类型谓词
function isNumber(x: any): x is number {
  return typeof x === "number";
}

// 8. 在 extends 条件语句中待推断的类型变量
type ParamType<T> = T extends (param: infer p) => any ? p : T;

interface IJack {
  name: 'jack';
  age: 25;
}
type Func = (user: IJack) => void;
type Param = ParamType<Func>;
type Test = ParamType<string>;
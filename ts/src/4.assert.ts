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

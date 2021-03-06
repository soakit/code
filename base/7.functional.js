/* 
    1. partial函数
    https://www.cnblogs.com/chenwenhao/p/11708105.html
    创建偏应用函数时，
    第一个参数接收一个函数，剩余参数是第一个传入函数所需参数。
    剩余参数待传入的参数用undefined占位，执行偏应用函数时填充undefined
*/
var partial = (fn, ...partialArgs) => {
    return function (...args) {
        let argIndex = 0
        for (let i = 0; i < partialArgs.length && args.length > argIndex; i++) {
            if (partialArgs[i] === undefined || i === this.undefinedIndex) {
                this.undefinedIndex = i
                partialArgs[i] = args[argIndex];
                argIndex++
            }
        }
        return fn.apply(null, partialArgs);
    }
}

var delayFn = partial(setTimeout, undefined, 1000);
delayFn(() => console.log("Do X task"))
delayFn(() => console.log("Do Y task"));

// 组合单个函数
// 该函数调用的方向是从右至左的（先执行 b，再执行 a）。
var compose = (a, b) => (c) => a(b(c))
// 通过组合计算字符串单词个数
let splitIntoSpaces = (str) => str.split(" ");   // 分割成数组
let count = (array) => array.length;  // 计算长度

var countWords = compose(count, splitIntoSpaces);
countWords("hello your reading about composition"); // 5

// 2. compose 函数
// 组合多个函数 composeN
var composeN = (...fns) => 
    fns.reverse().reduce(
        (f, g) => (...args) => g.call(null, f.apply(null, args)),
        fns.shift()
    )

let splitIntoSpaces = (str) => str.split(" ");   // 分割成数组
let count = (array) => array.length;  // 计算长度
var countWords2 = composeN(count, splitIntoSpaces);
countWords2("hello your reading about composition"); // 5
     
// 3. pipe 函数
// 管道和组合的概念很类似，都是串行处理数据。唯一区别就是执行方向：组合从右向左执行，管道从左向右执行。
// 组合多个函数 pipe
var pipe = (...fns) => (...args) =>
    fns.reduce((acc, fn) => fn(acc), ...args);

// 这种形式处理了args是多个参数的情况？
var pipe2 = (...fns) => 
    fns.reduce(
        (f, g) => (...args) => g.call(null, f.apply(null, args)),
        fns.shift()
    )

let splitIntoSpaces = (str) => str.split(" ");   // 分割成数组
let count = (array) => array.length;  // 计算长度
let minOne = num => num - 1;

var countWords = pipe(splitIntoSpaces, count, minOne);  // 此处的传参顺序与compose的相反
countWords("hello your reading about composition"); // 5

var countWords2= pipe2(splitIntoSpaces, count);  // 此处的传参顺序与compose的相反
countWords("hello your reading about composition"); // 5
// https://www.jianshu.com/p/6e4bfcb7ff36

// 第一种：固定传入参数，参数够了才执行
/**
 * 实现要点：柯里化函数接收到足够参数后，就会执行原函数，那么我们如何去确定何时达到足够的参数呢？
 * 柯里化函数需要记住你已经给过他的参数，如果没给的话，则默认为一个空数组。
 * 接下来每次调用的时候，需要检查参数是否给够，如果够了，则执行fn，没有的话则返回一个新的 curry 函数，将现有的参数塞给他。
 * 
 */
// 待柯里化处理的函数
let sum = (a, b, c, d) => {
    return a + b + c + d
}
// 柯里化函数，返回一个被处理过的函数 
function curry(fn) {
    const length = fn.length;

    const curryFn = (...args) => (...args2) => {
        const allArgs = args.concat(args2);
        if (allArgs.length === length) {
            return fn(...allArgs);
        }
        return curryFn(...allArgs);
    }
    return curryFn;
}
var sumPlus = curry(sum)
console.log(sumPlus(1)(2)(3)(4))
console.log(sumPlus(1, 2)(3)(4))
console.log(sumPlus(1, 2, 3)(4))

// 第二种：不固定传入参数
/* 
    1.用临时变量缓存所有参数
    2.输出的始终是函数
    3.调用函数时，自动执行函数的toString
*/
let sum = (...arr) => {
    return arr.reduce((a, b) => {
        return a + b
    }, 0)
}
const curry = (fn, ...initialArgs) => {
    let allArgs = []
    const curried = (...args) => { // args接收新参数
        allArgs = [...allArgs, ...args]
        return curried
    }
    curried.toString = () => {
        const res = fn(...allArgs)
        allArgs = []
        return res
    }
    return curried(...initialArgs)
}
var sumPlus = curry(sum)
// 加上空字符串，让其隐式调用toString
console.log('' + sumPlus(1, 2, 3, 4))
console.log('' + sumPlus(1, 2, 3)(4))
console.log('' + sumPlus(1)(2)(3)(4))
console.log('' + sumPlus(1, 2, 3)(4)(5))
console.log('' + sumPlus())

// 第三种：不固定传入参数，随时执行
/**
 * 当然了，柯里化函数的主要作用还是延迟执行，执行的触发条件不一定是参数个数相等，也可以是其他的条件。
 * 例如参数个为0的情况，那么我们需要对上面curry函数稍微做修改
 */
// 待柯里化处理的函数
let sum = (...arr) => {
    return arr.reduce((a, b) => {
        return a + b
    })
}

let curry = (fn, ...arr) => {  // arr 记录已有参数
    return (...args) => {  // args 接收新参数
        if (args.length === 0) {  // 参数为空时，触发执行
            return fn(...arr, ...args)
        } else {  // 继续添加参数
            return curry(fn, ...arr, ...args)
        }
    }
}

var sumPlus = curry(sum)
sumPlus(1)(2)(3)(4)()
sumPlus(1, 2)(3)(4)()
sumPlus(1, 2, 3)(4)()
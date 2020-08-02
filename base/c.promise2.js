// 串行执行多个promise
let arr = [() => {
    return new Promise(res => {
        setTimeout(() => {
            console.log("run", Date.now());
            res()
        }, 0)
    })
}, () => {
    return new Promise(res => {
        setTimeout(() => {
            console.log("run", Date.now());
            res()
        }, 1000)
    })
}, () => {
    return new Promise(res => {
        setTimeout(() => {
            console.log("run", Date.now());
            res()
        }, 2000)
    })
}]
// 1. while循环
let i
let p = Promise.resolve()
while ((i = arr.shift())) {
    let s = i
    p = p.then(() => s())
}

// 2. reduce
arr.reduce((s, v) => {
    return s.then(() => v())
}, Promise.resolve())

// 3. forEach
let res = Promise.resolve();
arr.forEach(promise => {
    res = res.then(() => promise())
})

// 4. async/await
;(async function () {
    for (const v of arr) {
        await v()
    }
})()

// 5. 递归
function dispatch(i, p = Promise.resolve()) {
    if (!arr[i]) {
        return Promise.resolve()
    }
    return p.then(() => dispatch(i + 1, arr[i]()))
}
dispatch(0)

// 6. for await of
;(async function () {
    for await (i of createAsyncIterable(arr)) {}
})()
// for await of和for of规则类似，只需要实现一个内部[Symbol.asyncIterator]方法即可
function createAsyncIterable(arr) {
    return {
        [Symbol.asyncIterator]() {
            return {
                i: 0,
                next() {
                    if (this.i < arr.length) {
                        return arr[this.i]().then(() => ({
                            value: this.i++,
                            done: false
                        }))
                    }
                    return Promise.resolve({ done: true })
                }
            }
        }
    }
}
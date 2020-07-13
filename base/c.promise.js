const MyPromise = (function () {
    // 定义Promise的三种状态常量
    const PENDING = 'PENDING'
    const FULFILLED = 'FULFILLED'
    const REJECTED = 'REJECTED'

    const isFunction = fn => typeof fn === 'function'

    class MyPromise {
        constructor(exec) {
            if (!isFunction(exec)) {
                throw new Error('MyPromise must accept a function as a parameter')
            }

            this.state = PENDING // 添加状态
            this.value = undefined // 添加值

            // 添加成功回调函数队列
            this._fulfilledQueues = []
            // 添加失败回调函数队列
            this._rejectedQueues = []

            // 添加resovle时执行的函数
            const resolveFn = val => {
                const run = () => {
                    if (this.state !== PENDING) return
                    // 依次执行成功队列中的函数，并清空队列
                    const runFulfilled = value => {
                        let cb;
                        while (cb = this._fulfilledQueues.shift()) {
                            cb(value)
                        }
                    };
                    // 依次执行失败队列中的函数，并清空队列
                    const runRejected = (error) => {
                        let cb;
                        while (cb = this._rejectedQueues.shift()) {
                            cb(error)
                        }
                    };
                    /**
                     * 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
                     * 当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
                    */
                    if (val instanceof MyPromise) {
                        val.then(value => {
                            this.value = value
                            this.state = FULFILLED
                            runFulfilled(value)
                        }, err => {
                            this.value = err
                            this.state = REJECTED
                            runRejected(err)
                        })
                    } else {
                        this.value = val
                        this.state = FULFILLED
                        runFulfilled(val)
                    }
                };
                // 为了支持同步的Promise，这里采用异步调用
                setTimeout(run, 0)
            };
            const rejectFn = err => {
                if (this.state !== PENDING) return
                // 依次执行失败队列中的函数，并清空队列
                const run = () => {
                    this.state = REJECTED
                    this.value = err
                    let cb;
                    while (cb = this._rejectedQueues.shift()) {
                        cb(err)
                    }
                };
                // 为了支持同步的Promise，这里采用异步调用
                setTimeout(run, 0)
            };

            try {
                exec(resolveFn, rejectFn);
            } catch (err) {
                rejectFn(err);
            }
        }

        then(onFulfilled, onRejected) {
            const { value, state } = this
            // 返回一个新的Promise对象
            return new MyPromise((onFulfilledNext, onRejectedNext) => {
                const commonFn = (value, fn, fulfillNextFn, rejectNextFn) => {
                    try {
                        if (!isFunction(fn)) {
                            fulfillNextFn(value)
                        } else {
                            const res = fn(value);
                            if (res instanceof MyPromise) {
                                // 如果当前回调函数返回MyPromise对象，
                                // 必须等待其状态改变后在执行下一个回调
                                res.then(fulfillNextFn, rejectNextFn)
                            } else {
                                // 否则会将返回结果直接作为参数，
                                // 传入下一个then的回调函数，
                                // 并立即执行下一个then的回调函数
                                fulfillNextFn(res)
                            }
                        }
                    } catch (err) {
                        // 如果函数执行出错，新的Promise对象的状态为失败
                        rejectNextFn(err)
                    }
                }

                // 封装一个成功时执行的函数
                const fulfilled = value => {
                    commonFn(value, onFulfilled, onFulfilledNext, onRejectedNext);
                }
                    
                // 封装一个失败时执行的函数
                const rejected = error => {
                    commonFn(error, onRejected, onFulfilledNext, onRejectedNext);
                };
                switch (state) {
                    // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                    case PENDING:
                        this._fulfilledQueues.push(fulfilled)
                        this._rejectedQueues.push(rejected)
                        break
                    // 当状态已经改变时，立即执行对应的回调函数
                    case FULFILLED:
                        fulfilled(value)
                        break
                    case REJECTED:
                        rejected(value)
                        break
                }
            })
        }

        static resolve(value) {
            // 如果参数是MyPromise实例，直接返回这个实例
            if (value instanceof MyPromise) return value
            return new MyPromise(resolve => resolve(value))
        }

        static reject(value) {
            return new MyPromise((resolve, reject) => reject(value))
        }

        static all(list) {
            return new MyPromise((resolve, reject) => {
                // 返回值的集合
                const values = []
                let count = 0
                for (const [i, p] of list.entries()) {
                    // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                    this.resolve(p).then(res => {
                        values[i] = res
                        count++
                        // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                        if (count === list.length) resolve(values)
                    }, err => {
                        // 有一个被rejected时返回的MyPromise状态就变成rejected
                        reject(err)
                    })
                }
            })
        }

        static race(list) {
            return new MyPromise((resolve, reject) => {
                for (const p of list) {
                    // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                    this.resolve(p).then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                }
            })
        }

        catch(onRejected) {
            return this.then(undefined, onRejected)
        }
        
        finally(cb) {
            return this.then(
                value => MyPromise.resolve(cb()).then(() => value),
                reason => MyPromise.resolve(cb()).then(() => { throw reason })
            );
        }
    }

    return MyPromise
})()

// test
new MyPromise(function (resolve, reject) {
    resolve('resolved...')
}).then(function (value) {
    console.log(value)
    return new MyPromise((resolve, reject) => {
        resolve(value)
    });
}).then(function (value) {
    console.log('链式调用', value)
})

MyPromise.resolve('static resolve...').then(function (value) {
    console.log(value)
    return MyPromise.resolve(value)
}).finally(() => {
    console.log('static resolve, finally...')
}).then(value => {
    console.log(value, 'after static resolve of finally...')
})

MyPromise.reject('static reject...').catch(function (value) {
    console.log(value)
}).finally(() => {
    console.log('finally...')
})

const p1 = new MyPromise(function (resolve, reject) {
    resolve('p1 resolved...')
})
const p2 = new MyPromise(function (resolve, reject) {
    resolve('p2 resolved...')
})

MyPromise.all([p1, p2]).then(function (value) {
    console.log(value)
})

MyPromise.race([p1, p2]).then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})
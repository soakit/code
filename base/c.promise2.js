const myPromise = (function(){
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function myPromise(exec) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        const reject = reason => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
            }
        }
        try {
            exec(value => {
                if (this.state === PENDING) {
                    this.state = RESOLVED
                    this.value = value
                }
            }, reject)
        } catch (err) {
            reject(err);
        }
    }
    myPromise.prototype.then = function(onFullFilled, onRejected){
        if (this.state === RESOLVED) {
            typeof onFullFilled === 'function' && onFullFilled(this.value)
        } else if (this.state === REJECTED) {
            typeof onRejected === 'function' && onRejected(this.reason)
        }
    }
    myPromise.resolve = function(data) {
        if (data instanceof myPromise) {
            return data;
        }
        return new myPromise(resolve => {
            resolve(data);
        })
    }
    
    myPromise.reject = function(data) {
        if (data instanceof myPromise) {
            return data;
        }
        return new myPromise((resolve, reject) => {
            reject(data);
        })
    }
    myPromise.all = function(promises) {
        if (!Array.isArray(promises)) {
            throw new Error("promises must be an array")
        }
        return new myPromise(function (resolve, reject) {
            let promsieNum = promises.length;
            let resolvedCount = 0;
            let resolveValues = new Array(promsieNum);
            for (let i = 0; i < promsieNum; i++) {
                myPromise.resolve(
                    promises[i].then(function (value) {
                        resolveValues[i] = value;
                        resolvedCount++;
                        if (resolvedCount === promsieNum) {
                            return resolve(resolveValues)
                        }
                    }, function (reason) {
                        return reject(reason);
                    })
                )
            }
        })
    }
    myPromise.race = function(promises) {
        if (!Array.isArray(promises)) {
            throw new Error("promises must be an array")
        }
        return new myPromise(function (resolve, reject) {
            promises.forEach(
                p => myPromise.resolve(p).then(
                    data => {
                        resolve(data)
                    }, reason => {
                        reject(reason)
                    })
            )
        })
    }

    return myPromise
})()

// test
new myPromise(function (resolve, reject) {
    if (Math.random() > 0.5) {
        resolve('resolved...')
    } else {
        reject('rejected...')
    }
}).then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})

myPromise.resolve('static resolve...').then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})

myPromise.reject('static reject...').then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})

const p1 = new myPromise(function (resolve, reject) {
    resolve('p1 resolved...')
})
const p2 = new myPromise(function (resolve, reject) {
    resolve('p2 resolved...')
})

myPromise.all([p1, p2]).then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})

myPromise.race([p1, p2]).then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})
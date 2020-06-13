const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(exec) {
    var _this = this;
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFn = []
    this.onRejectedFn = []

    exec(resolve, reject)

    function resolve(value) {
        if (_this.state === PENDING) {
            _this.state = RESOLVED
            _this.value = value;
            _this.onFulfilledFn.forEach(fn => fn(value))
        }
    }

    function reject(reason) {
        if (_this.state === PENDING) {
            _this.state = REJECTED
            _this.reason = reason;
            _this.onRejectedFn.forEach(fn => fn(reason))
        }
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.state === RESOLVED) {
        typeof onFulfilled === 'function' && onFulfilled(this.value)
    } else if (this.state === REJECTED) {
        typeof onRejected === 'function' && onRejected(this.reason)
    } else if (this.state === PENDING) {
        debugger
        this.onFulfilledFn.push(function() {
            onFulfilled(this.value)
        })
        this.onRejectedFn.push(function() {
            onRejected(this.reason)
        })
    }
}

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
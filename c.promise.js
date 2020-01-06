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
        typeof onFulfilled === 'function' && this.onFulfilledFn.push(onFulfilled)
    }
    if (this.state === REJECTED) {
        typeof onRejected === 'function' && this.onRejectedFn.push(onRejected)
    }
}
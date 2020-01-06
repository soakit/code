Function.prototype.before = function (beforeFn) {
    const self = this;
    return function () {
        beforeFn.apply(this, arguments)
        return self.apply(this, arguments)
    }
}

Function.prototype.after = function (afterFn) {
    const self = this;
    return function () {
        const ret = self.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
    }
}

var fncc = function () {
    console.log('fn...')
}

fncc = fncc.before(function () {
    console.log('before...')
}).after(function () {
    console.log('after...')
})
fncc();
Function.prototype.before = function (beforeFn) {
    return (...args) => {
        beforeFn.apply(this, args)
        return self.apply(this, args)
    }
}

Function.prototype.after = function (afterFn) {
    return (...args) => {
        const ret = this.apply(this, args)
        afterFn.apply(this, args)
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
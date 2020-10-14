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

var fn_aop = function () {
    console.log('fn...')
}

fn_aop = fn_aop.before(function () {
    console.log('before...')
}).after(function () {
    console.log('after...')
})
fn_aop();

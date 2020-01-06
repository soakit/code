var getSingle = function (fn) {
    var ret;
    return function () {
        return ret || (ret = fn.apply(this, arguments))
    }
}

var fn = function () {
    console.log('singleton...', ...arguments)
}
var newFn = getSingle(fn)
var fn1 = newFn('arg1', 'arg2')
var fn2 = newFn('arg3', 'arg4')
console.log(fn1 === fn2)
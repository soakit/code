// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function () {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
    var [context, ...args] = arguments
	var ctx = context || window
	ctx.fn = this
	var result = ctx.fn(...args)
	delete ctx.fn
	return result
}

// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function () {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
    var [context, ...args] = arguments
	var ctx = context || window
	ctx.fn = this
	var result = ctx.fn(...args)
	delete ctx.fn
	return result
}
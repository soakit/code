// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function () {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
    var [context, ...args] = arguments
	var ctx = context || window
	// 用Symbol > 随机数 > 不常用的作为key，这里使用不常用的
	ctx.__fn__ = this
	var result = ctx.__fn__(...args)
	delete ctx.__fn__
	return result
}

// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function () {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
    var [context, ...args] = arguments
	var ctx = context || window
	ctx.__fn__ = this
	var result = ctx.__fn__(...args)
	delete ctx.__fn__
	return result
}

// test
function haha(...args){
	console.log(this.value, args)
}
var obj = {
	value: 'haha'
}

haha.myapply(obj, ['apply args...'])
haha.mycall(obj, 'calll args...')
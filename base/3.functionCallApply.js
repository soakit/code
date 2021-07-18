// 思路：将要改变this指向的方法挂到目标this上执行并返回
// 参数不固定，使用arguments配合eval
Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
	var ctx = Object(context) || window
	// 用Symbol > 随机数 > 不常用的作为key，这里使用不常用的
	ctx.__fn__ = this

	var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

	var result = eval('ctx.__fn__(' + args + ')');
	delete ctx.__fn__
	return result
}

// 思路：将要改变this指向的方法挂到目标this上执行并返回
// 第二个参数是数组，判断长度
Function.prototype.myapply = function (context, arr) {
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
	var ctx = Object(context) || window
	ctx.__fn__ = this

	var result;

	if (!arr || !arr.length) {
		result = ctx.__fn__();
	} else {
		result = eval('ctx.__fn__(' + arr.map((it, i) => 'arr[' + i + ']') + ')')
	}
	
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
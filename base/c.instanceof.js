function myInstaceOf(instance, Ctor) {
    if (typeof Ctor !== 'function') {
        throw new Error('Ctor应该是一个Function')
    }
    // 基础类型则直接返回false
    if (!instance || (typeof instance !== 'object' && typeof instance !== 'function')) {
        return false
    }
    const CtorPrototype = Ctor.prototype
    if (!CtorPrototype) {
        // 考虑Ctor箭头函数
        return false
    }
    while (instance) {
        // 方式一
        // var instancePrototype = instance.__proto__
        // 方式二、getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
        const instancePrototype = Object.getPrototypeOf(instance);
        if (!instancePrototype) {
            return false
        }
        if (instancePrototype === CtorPrototype) {
            return true
        }
        instance = instancePrototype
    }
}

// 测试
var Person = function () { }
var p1 = new Person()
console.log(myInstaceOf(p1, Person)) // true

var str1 = 'hello world'
console.log(myInstaceOf(str1, String)) // false

var str2 = new String('hello world')
console.log(myInstaceOf(str2, String)) // true

var arrowFn = () => {}
console.log(myInstaceOf(arrowFn, Function)) // true
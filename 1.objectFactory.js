/**
 * 实现:new
 * 1.创建一个空对象obj = {}
 * 2.设置空对象的原型链->对象的__proto__指向构造函数的prototype
 * 3.将构造函数的this指向obj，并执行
 * 4.判断执行的返回值类型，是对象则返回，否则返回obj
 * (js中的构造函数，是不需要有返回值的，所以默认返回的是新创建的空对象obj)
 */
var objectFactory = function() {
    var obj = {}
    // 取出构造函数 和 实参
    const [ctor, ...args] = arguments
    // 将构造函数的原型挂到obj.__proto__上
    // 效果：obj模拟成Person的实例
    obj.__proto__ = ctor.prototype;
    var ret = ctor.apply(obj, args)
    return typeof ret === 'object' ? ret : obj;
}

function Person(name, age) {
    this.name = name
    this.age = age
}

function Person2(name, age) {
    return {
        name,
        age
    }
}

var p = objectFactory(Person, 'zhangsan', 24)
var p2 = objectFactory(Person2, 'lisi', 20)
var p3 = new Person('wangwu', 30)

console.log(p, p2, p3)
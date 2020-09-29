/**
 * 实现:new
 * objectFactory(Person, 'zhangsan', 24)
 * 1.创建一个空对象obj
 * 2.设置obj的原型链(对象的__proto__)指向构造函数的prototype
 * 3.将构造函数的this指向obj，并执行(Person.apply(obj))
 * 4.判断执行的返回值类型，是对象则返回，否则返回obj
 * (js中的构造函数，是不需要有返回值的，所以默认返回的是新创建的空对象obj)
 */
// 方式1
var objectFactory = function () {
    // 取出构造函数 和 实参
    const [ctor, ...args] = arguments
    // 将构造函数的原型挂到obj.__proto__上
    // 效果：obj模拟成Person的实例
    // 方式一、
    // const obj = {}
    // obj.__proto__ = ctor.prototype;
    // 方式二、
    const obj = Object.create(ctor.prototype)
    const ret = ctor.apply(obj, args)
    if ((typeof ret === 'object' || typeof ret === 'function') && ret) {
        return ret;
    }
    return obj;
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

var person1 = objectFactory(Person, 'zhangsan', 24)
var person2 = objectFactory(Person2, 'lisi', 20)
var person3 = new Person('wangwu', 30)

console.log(person1, person2, person3)
// object.create(proto, propertiesObject)
// 当proto为null的时候创建的新对象完全是一个空对象
// 没有原型，也就是没有继承Object.prototype上的方法

/**
 * 实现:Object.create
 */
Object.create = Object.create || function (proto, properties) {
    var F = function () { }
    F.prototype = proto
    if (properties) {
        Object.defineProperties(F, properties)
     }
    return new F()
}
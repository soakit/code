function Animal(name) {
    this.name = name
}

Animal.planet = 'earth'
Animal.isIntelligent = function(){
    return false
}

Animal.prototype.say = function () {
    console.log(this.name)
}

function Person(name, age) {
    Animal.apply(this, arguments);
    this.name = name
    this.age = age
}

Person.prototype.say = function(){
    console.log(this.name, this.age)
}

// 方式一
Person.prototype = Object.create(Animal.prototype)
// 方式二
/* function F() { }
F.prototype = Animal.prototype
Person.prototype = new F() */

// Person.prototype.constructor = Person; // 这种写法默认enumerable:true
Object.defineProperty(Person.prototype, "constructor", {
    value: Person,
    enumerable: false
})

Person.isIntelligent = function(){
    return true
}
// 继承父类的静态属性和方法
Person.__proto__ = Animal

var a1 = new Animal('dog')
var p1 = new Person('zhangsan', 18)
a1.say()
p1.say()
console.log(a1, p1, Person.planet, Person.isIntelligent())
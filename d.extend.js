function Animal(name) {
    this.name = name
}

Animal.prototype.say = function() {
    console.log(this.name + '在叫唤')
}

function Person(name) {
    Animal.call(this, arguments)
    this.name = name
}

// 方式一：
// Person.prototype = Object.create(Animal.prototype)
// 方式二：
function F(){}
F.prototype = Animal.prototype
Person.prototype = new F()

Person.prototype.constructor = Person

var a1 = new Animal('dog')
var p1 = new Person('zhangsan')

a1.say()
p1.say()
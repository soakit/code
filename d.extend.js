function Animal(name) {
    this.name = name
}

Animal.prototype.say = function () {
    alert(this.name)
}

function Person(name, age) {
    Animal.apply(this, arguments);
    this.name = name
    this.age = age
}

// 方式一
Person.prototype = Object.create(Animal.prototype)

// 方式二
function F() { }
F.prototype = Animal.prototype
Person.prototype = new F()
Person.prototype.constructor = Person

var a1 = new Animal('dog')
var p1 = new Person('zhangsan', 18)
console.log(a1, p1)

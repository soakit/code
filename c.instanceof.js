function myInstanceof(l, r) {
    let right = r.prototype
    let left = l.__proto__
    while (true) {
        if (left === null || right === undefined) {
            return false
        }
        if (left === right) {
            return true
        }
        left = left.__proto__
    }
}

// test
var Animal = function(name) {
    this.name = name
}

var dog = new Animal('dog')

console.log(myInstanceof(dog, Animal))
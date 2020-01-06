var isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}

var isString = isType('String')
var isArray = isType('Array')
var isNumber = isType('Number')

console.log(isString('s'), isArray([]), isNumber(1))

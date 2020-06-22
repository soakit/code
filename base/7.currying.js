var currying = function(fn) {
    var args = []
    return function() {
        if (!arguments.length) {
            return fn.apply(this, args)
        }
        [].push.apply(args, arguments)
        return arguments.callee
    }
}

var cost = (function() {
    var money = 0;
    return function() {
        for (var i=0; i<arguments.length; i++) {
            money += arguments[i]
        }
        return money
    }
})()

var curryingCost = currying(cost)

curryingCost(100)
curryingCost(200, 300)
console.log(curryingCost()) // 600

Function.prototype.uncurrying = function () {
    var self = this;
    return function() {
        const [fn, ...args] = arguments
        return self.apply(fn, args)
    }
}
var push = Array.prototype.push.uncurrying();
(function() {
    push(arguments, 4)
    console.log(...arguments) // 1, 2, 3, 4
})(1, 2, 3)
var throttle = function(fn, delay) {
    var timer
    var first = true

    return function() {
        var args = arguments
        var self = this
        if (first) {
            first = false
            fn.apply(self, args)
            return
        }

        if (timer) {
            return
        }

        timer = setTimeout(function() {
            clearTimeout(timer)
            timer = null
            fn.apply(self, args)
        }, delay || 500)
    }
}

window.onresize = throttle(function() {
    console.log(1)
}, 500)
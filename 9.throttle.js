var throttle = function(fn, delay) {
    var canRun = true
    var timer

    return function() {
        var args = arguments
        var context = this
        if (!canRun) {
            return
        }
        canRun = false
        timer = setTimeout(function() {
            fn.apply(context, args)
            canRun = true
        }, delay || 500)
    }
}

window.onresize = throttle(function() {
    console.log(1)
}, 500)
var debounce = function(fn, delay) {
    var timer
    return function() {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

// test
document.getElementById('input').addEventListener('keyup', 
    debounce(function(e) {
        console.log(e.target.value)
    }, 200)
)

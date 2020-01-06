var timeChunk = function(data, fn, count) {
    var t;

    var start = function() {
        for (var i=0; i<Math.min(count || 1, data.length); i++) {
            fn(data.shift())
        }
    }

    return function() {
        t = setInterval(function() {
            if (!data.length) {
                clearInterval(t)
            }
            start()
        }, 200)
    }
}

// timeChunk(new Array(Math.pow(10, 4)), function() {
// }, Math.pow(10, 3))()
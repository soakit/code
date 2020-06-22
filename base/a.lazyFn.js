var addEvent = function(el, type, handler) {
    if (window.addEventListener) {
        addEvent = function(el, type, handler) {
            el.addEventListener(type, handler, false)
        }
    } else if (window.attachEvent) {
        addEvent = function(el, type, handler) {
            el.attachEvent('on' + type, handler)
        }
    }
    addEvent(...arguments)
}

// test
addEvent(window, 'load', function() {
    console.log('window loaded')
})
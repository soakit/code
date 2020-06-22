var getSingle = function(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments))
    }
}

var createLayer = function() {
    var div = document.createElement('div')
    div.innerHTML = '我是弹窗'
    div.classList.add('layer')

    document.body.appendChild(div)
    return div
}

var createSingleLayer = getSingle(createLayer)


document.getElementById('single_layer_btn').addEventListener('click', function() {
    var layer = createSingleLayer()
    layer.style.display = 'block'
}, false)
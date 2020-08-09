// 方式一、
function parseJson(jsonStr) {
    return eval('(' + jsonStr + ')')
}

// 方式二、
function parseJson2(jsonStr) {
    return (new Function('return ' + jsonStr))()
}
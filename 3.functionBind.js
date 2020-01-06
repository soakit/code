/**
 * 实现:bind
 */
Function.prototype.bind2 = function (context) {
    var self = this;
    var slice = Array.prototype.slice

    // 取出bind对象后的参数
    var args = slice.call(arguments, 1)
    var F = function () { }

    var fbound = function () {
        self.apply(context, args.concat(slice.call(arguments)))
    }

    F.prototype = this.prototype
    fbound.prototype = new F()

    return fbound
}

var obj = {
    title: 'title',
    getTitle() {
        console.log(this.title, ...arguments)
        return this.title
    }
}

var getDocTitle = obj.getTitle.bind2(document, 'hehe')
getDocTitle('hahaha')

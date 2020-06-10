Function.prototype.bind2 = function () {
    var self = this
    var [ctx, ...args] = arguments

    var F = function () { }

    var fbound = function () {
        self.apply(ctx, args.concat([...arguments]))
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
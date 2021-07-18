Function.prototype.bind2 = function () {
    var self = this
    var [ctx, ...args] = arguments

    var fbound = function () {
        // this instanceof fbound === true时，
        // 说明返回的fbound被当做new的构造函数调用
        return self.apply(
            this instanceof fbound ? this : ctx, 
            args.concat([...arguments])
        )
    }
    //  方式一：
    // var F = function () { }
    // 考虑没有prototype属性的情况，如箭头函数
    // if (this.prototype) {
    //     F.prototype = this.prototype
    // }
    // fbound.prototype = new F()

    // 方式二：
    if (this.prototytype) {
        fbound.prototype = Object.create(this.prototype)
    }

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
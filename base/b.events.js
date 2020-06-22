/**
 * 实现:发布订阅模式
 */
function Events(){
    this.events = {}

    this.on = function(type, fn) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(fn)
    }

    this.once = function(type, fn) {
        this.on(type, fn)
        fn.__once__ = true
    }

    this.off = function(type, fn) {
        if (!this.events[type]) {
            return
        }
        const index = this.events[type].indexOf(fn)
        this.events[type].splice(index, 1)   
    }

    this.emit = function(type, ...args) {
        if (!this.events[type]) {
            return
        }
        const fns = this.events[type]
        for (let i=0; i<fns.length; i++) {
            const fn = fns[i]
            if (fn.__once__) {
                this.off(type, fn)
            }
            fn.apply(this, args)
        }
    }
}

const e = new Events()
function loginFn(name) {
    console.log(name + ' logined...')
}
e.on('login', loginFn)
e.emit('login', 'zhangsan')
e.off('login', loginFn)
e.emit('login', 'lisi')

e.once('logout', function(name) {
    console.log(name + ' logout...')
})
e.emit('logout', 'zhangsan')
e.emit('logout', 'lisi')
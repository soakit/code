class KVue {
    constructor(options) {
        this.$options = options
        
        // 数据响应化
        this.$data = options.data;
        this.observe(this.$data, true);

        // 编译模板
        new Compile(options.el, this);

        // created执行
        if (options.created) {
            options.created.call(this);
        }
    }

    observe(value, first) {
        if (!value || typeof value !== 'object') {
            return;
        }
        // 遍历该对象
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key])
            if (first) {
                // 代理data中的属性到vue实例上
                this.proxyData(key);
            }
        });
    }

    defineReactive(obj, key, val) {
        this.observe(val); // 递归

        const dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return
                }
                val = newVal
                dep.notify();
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }
}

// 用来管理Watcher
class Dep {
    constructor() {
        this.deps = [] // 用于存放watcher
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        // 将当前watcher实例指定到Dep静态属性target
        Dep.target = this
        this.vm[this.key]; // 触发getter，添加依赖
        Dep.target = null;
    }

    update() {
        this.cb.call(this.vm, this.vm[this.key])
    }
}
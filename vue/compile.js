class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;

        if (this.$el) {
            // 转换内部内容为片段Fragment
            this.$fragment = this.node2Fragment(this.$el)
            // 执行编译
            this.compile(this.$fragment)
            // 将编译完的html结果追加到$el
            this.$el.appendChild(this.$fragment)
        }
    }

    // 将宿主元素中代码片段拿出来遍历，这样做比较高效
    node2Fragment(el) {
        const frag = document.createDocumentFragment();
        // 将el中所有子元素
        let child;
        while ((child = el.firstChild)) {
            frag.appendChild(child);
        }
        return frag;
    }

    // 编译过程
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 类型判断
            if (this.isElement(node)) {
                // 元素
                // 查找k-, @, :开头的
                const nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    const { name, value } = attr
                    // 处理指令
                    if (this.isDirective(name)) {
                        // k-text
                        const dir = name.substring(2)
                        // 执行指令
                        this[dir] && this[dir](node, this.$vm, value)
                    }
                    // 处理事件
                    if (this.isEvent(name)) {
                        // @click
                        const event = name.substring(1)
                        this.eventHandler(node, this.$vm, value, event)
                    }
                })
            } else if (this.isInterpolation(node)) {
                // 处理文本
                this.compileText(node)
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, "text")
    }

    // 更新函数
    update(node, vm, value, dir) {
        const updateFn = this[dir + 'Updater']
        // 初始化
        updateFn && updateFn(node, vm[value])
        new Watcher(vm, value, function (newVal) {
            updateFn && updateFn(node, newVal)
        })
    }

    text(node, vm, value) {
        this.update(node, vm, value, "text");
    }

    html(node, vm, value) {
        this.update(node,vm,value, "html")
    }

    // 双向绑定
    model(node, vm, value) {
        this.update(node, vm, value, "model");

        node.addEventListener("input", e => {
            vm[value] = e.target.value
        })
    }

    modelUpdater(node, value) {
        node.value = value
    }

    htmlUpdater(node, value) {
        node.innerHTML = value
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    // 事件处理器
    eventHandler(node, vm, exp, event) {
        let fn = vm.$options.methods && vm.$options.methods[exp]
        if (event && fn) {
            node.addEventListener(event, fn.bind(vm))
        }
    }

    isDirective(attr) {
        return attr.startsWith("k-")
    }

    isEvent(attr) {
        return attr.startsWith("@")
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    // 插值文本
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}
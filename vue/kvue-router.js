export default class VueRouter {
    constructor(options) {
        this.$options = options;
        // path, component映射
        this.routeMap = {};
        // current保存当前hash
        // vue使其使响应式
        this.app = new VueRouter({
            data: {
                current: "/"
            }
        });
    }

    init() {
        this.bindEvents();
        this.createRouteMap(this.$options.routes);
        this.initComponent();
    }

    // 这里只处理hash模式
    bindEvents() {
        window.addEventListener("load", this.onHashChange.bind(this), false);
        window.addEventListener("hashchange", this.onHashChange.bind(this), false);
    }

    onHashChange() {
        this.app.current = location.hash.slice(1) || "/";
    }

    // 创建路由映射表
    createRouteMap(routes){
        routes.forEach(item => {
            this.routeMap[item.path] = item;
            if (item.children) {
                this.createRouteMap(item.children)
            }
        });
    }

    initComponent() {
        // 处理router-link
        Vue.component("router-link", {
            props: {
                to: String,
            },
            render(h) {
                return h('a', 
                    {
                        attrs: {
                            href: "#" + this.to
                        },
                    },
                    [this.$slots.default]
                )
            }
        });
        // 处理router-view
        Vue.component("router-view", {
            render(h) {
                // 取得当前路由映射表中的component属性
                var component = this.routeMap[this.app.current].component;
                return h(component);
            }
        });
    }
    
}

let Vue;
VueRouter.install = function(_vue) {
    Vue = _vue;
    
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                // 确保使根组件时执行一次，将router实例放到Vue原型
                // 之后所有组件实例均有$router属性
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init()
            }
        }
    })
}
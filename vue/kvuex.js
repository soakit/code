let Vue;

function install(_vue) {
    Vue = _vue;

    // store执行时就有了vue
    // 这也是Vue.use需在新建store之前
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

class Store {
    constructor(options = {}) {
        this.state = new Vue({
            data: options.state
        });

        this.mutations = options.mutations || {};

        this.actions = options.actions || {};

        options.getters && this.handleGetters(options.getters)
    }

    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state);
                }
            })
        })
    }

    commit = (type, args) => {
        this.mutations[type](this.state, args);
    }

    dispatch(type, args) {
        this.actions[type]({
            commit: this.commit,
            state: this.state,
        }, args)
    }
}

export default {
    Store,
    install
}
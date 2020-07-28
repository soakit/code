/* 
    一个乞丐版的Reactive
*/

let activeEffect
// mini依赖中心
class Dep {
    subs = new Set()
    depend() {
        // 收集依赖
        if (activeEffect) {
            this.subs.add(activeEffect)
        }
    }
    notify() {
        // 数据变化，触发effect执行
        this.subs.forEach(effect => effect())
    }
}

function effect(fn) {
    activeEffect = fn
    fn()
}

const dep = new Dep()

// ref 大概的原理
function ref(val) {
    let _value = val
    // 拦截.value操作
    const state = {
        get value() {
            // 获取值，收集依赖，track
            dep.depend()
            return _value
        },
        set value(newValue) {
            // 修改，通过dep,执行有这个依赖的effect函数
            _value = newValue
            // trigger
            dep.notify()
        }
    }
    return state
}

const state = ref(0)

effect(() => {
    // 依赖state的变化
    console.log(state.value)
})

setInterval(() => {
    state.value++
}, 1000)
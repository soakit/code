// https://www.yuque.com/woniuppp/vue3
// https://github.com/shengxinjing/vue3-workshop

const effectStack = []
// 存储所有reactive，key对应的依赖
const targetMap = new WeakMap()
/* 
{
    target1: {
        key: [effect1, effect2] // Set
    },
    target2: ...
} 
*/

function track(target, key) {
    // 收集依赖
    // reactive可能有多个，一个又可能有多个属性
    const effect = effectStack[effectStack.length - 1]
    if (!effect) {
        return
    }
    let depMap = targetMap.get(target)
    if (!depMap) {
        depMap = new Map()
        targetMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if (!dep) {
        dep = new Set()
        depMap.set(key, dep)
    }
    // 添加依赖
    dep.add(effect)
    effect.deps.push(dep)
}

// 触发更新
function trigger(target, key, info) {
    let depMap = targetMap.get(target)
    if (!depMap) {
        return
    }

    const effectSet = new Set()
    const computedRunners = new Set()

    if (key) {
        let deps = depMap.get(key)
        deps.forEach(effect => {
            if (effect.computed) {
                computedRunners.add(effect)
            } else {
                effectSet.add(effect)
            }
        })
    }
    computedRunners.forEach(computed => computed())
    effectSet.forEach(effect => {
        effect()
    })
}

// 副作用
function effect(fn, option={}) {
    // option: {lazy: false, computed: false}
    // computed是一个特殊的effect

    const e = createReactiveEffect(fn, option)
    if (!option.lazy) {
        // laze决定是否首次就执行effect
        e()
    }
    return e
}

const baseHandler = {
    get(target, key) {
        const res = target[key] // reflect更合理
        // 收集依赖
        track(target, key)
        return res
    },
    set(target, key, value) {
        const info = {
            oldValue: target[key],
            newValue: value
        }
        target[key] = value // Reflect.set
        // 触发更新
        trigger(target, key, info)
    }
}
function reactive(target) {
    // target变成响应式
    const observed = new Proxy(target, baseHandler)
    return observed
}

function createReactiveEffect(fn, options={}) {
    const effect = function effect(...args) {
        return run(effect, fn, args)
    }
    // 为了后续清理，以及缓存
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

function run(effect, fn, args) {
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop()
        }
    }
}

function computed(fn) {
    // 特殊的effect
    const run = effect(fn, {
        computed: true,
        lazy: true,
    })
    return {
        effect: run,
        get value() {
            return run()
        }
    }
}
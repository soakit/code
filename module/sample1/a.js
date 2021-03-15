let mod = require('./b.js')
console.log('a.js-1, count', mod.count)
console.log('\ta.js-1, count2', mod.count2)
mod.plusCount()
mod.plusCount2()
console.log('a.js-2, count', mod.count)
console.log('\ta.js-2, count2', mod.count2)
setTimeout(() => {
    mod.count++
    mod.count2++
    console.log('a.js-3, count', mod.count)
    console.log('\ta.js-3, count2', mod.count2)
}, 1000)
console.log('异步改值start')
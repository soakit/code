// a.js
var mod = require('./b.js')
console.log('a.js-1', mod.obj.count)
mod.plusCount()
console.log('a.js-2', mod.obj.count)
setTimeout(() => {
  mod.obj.count = 3
  console.log('a.js-3', mod.obj.count)
}, 2000)
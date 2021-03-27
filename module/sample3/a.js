exports.done = false
console.log('a文件已经执行的部分')
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = true
console.log('a.js-2', '执行完毕')
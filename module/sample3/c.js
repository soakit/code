// c.js
console.log('c文件引入a模块')
let a = require('./a.js')
console.log('c文件引入b模块')
let b = require('./b.js')

console.log('c.js-1', '执行完毕', a.done, b.done)
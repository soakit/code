require('./c.js');

// c文件引入a模块
// a文件已经执行的部分      
// 循环引用start...
// b.js-1 false
// b.js-2 执行完毕
// a.js-1 true
// a.js-2 执行完毕
// c文件引入b模块
// c.js-1 执行完毕 true true

// 当遇到require命令时，会执行对应的模块代码。当循环引用时，有可能只输出某模块代码的一部分。当引用同一个模块时，不会再次加载，而是获取缓存
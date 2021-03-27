require('./a.js');

// a.js-1, count 1
//         a.js-1, count2 1
// a.js-2, count 1
//         a.js-2, count2 3
// 异步改值start
// a.js-3, count 2
//         a.js-3, count2 4
// b.js-1, count 3
//         b.js-1, count2 4

// 1. 对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
// 1.1 如果希望能够同步代码，可以export出去一个getter,setter

/* 
es6模块中的值属于【动态只读引用】。
import的变量是只读的，不论是基本类型还是复杂类型，不允许修改引入变量的引用(行为与关键字const的用法类似)。
当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
对于动态来说，原始值发生变化，import加载的值也会发生变化。不论是基本数据类型还是复杂数据类型。 
循环引用时，ES6模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。
*/
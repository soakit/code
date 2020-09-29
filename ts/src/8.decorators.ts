// 1. 类装饰器
function Greeter(greeting: string) {
  return function(target: Function) {
    target.prototype.greet = function() : void {
      console.log(greeting)
    }
  }
}
@Greeter("Hello World!")
class Greeting {
  greet() {
  }
  constructor() {
  }
}
new Greeting().greet() // Hello World!
// 配合https://github.com/rbuckton/reflect-metadata使用


function replace<T extends {new(...args: any[]):{}}>(target: T) {
    return class extends target {
      newName = "newName";
      age = 18
    }
}
@replace
class Demo {
    oldName = "oldName";
    constructor(oldName: string) {
        this.oldName = oldName;
    }
}
console.log(new Demo("oldName"));
// Demo: { "oldName": "oldName", "newName": "newName", "age": 18 } 

// 1.1 装饰器组合
function f() {
    console.log('f求值');
    return function(target: any) {
        console.log('f装饰');
    }
}
function g() {
    console.log('g求值');
    return function(target: any) {
        console.log('g装饰');
    }
}
@f()
@g()
class ComposeDemo {
}
// f求值
// g求值
// g装饰
// f装饰

// 2. 方法装饰器
function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunction = target[propertyKey]; // 获取方法引用
    const newFunction = function(...args: any[]) {
        console.log('call function ', propertyKey);
        oldFunction.call(target, ...args);
    }
    descriptor.value = newFunction; // 替换原声明
}
class Demo02 {
    @methodDecorator
    demo() {
      console.log('call demo');
    }
}
const demo02 = new Demo02();
demo02.demo();

// 3. 属性装饰器
function propertyDecorator(value: string) {
	return function(target: any, propertyKey: string) {
		target[propertyKey] = value;
	}
}
class Demo03 {
    @propertyDecorator('hah') name?: string;
}
console.log(new Demo03().name); // hah

// 函数参数装饰器
/* 
参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    - 参数的名字
    - 参数在函数参数列表中的索引
用处
    在开发Web框架时自动注入请求参数 
*/
function PathParam(paramDesc: string) {
    return function (target: any, paramName: string, paramIndex: number) {
        !target.$meta && (target.$meta = {});
        target.$meta[paramIndex] = paramDesc;
    }
}
class Demo04 {
    constructor() { }
    getUser( @PathParam("userId") userId: string) { }
}
console.log((Demo04 as any).prototype.$meta); // { "0": "userId" } 

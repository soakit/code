// 1. 属性
interface Person {
  readonly name: string; // 只读
  age?: number; // 可选
  sex: boolean;
  [propName: string]: any; // 任意属性
}

// 2. ReadonlyArray<T>
// ReadonlyArray<T> 类型，与 Array<T> 相似，
// 只是把所有可变方法去掉了，可确保数组创建后再也不能被修改。
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // ERROR
// ro.push(5); // ERROR
// ro.length = 100; // ERROR
// a = ro; // ERROR

// 接口和类型都可以用来描述对象的形状或函数签名
/* 
interface Point {
  x: number;
  y: number;
}
interface SetPoint {
  (x: number, y: number): void
} 
*/

/* 
type Point = {
  x: number;
  y: number;
}
type setPoint = (x: number, y: number) => void; 
*/

// interface extends interface
/* 
interface PartialPointX {
  x: number;
}
interface Point extends PartialPointX {
  y: number;
} 
*/

// type alias extends type alias
/* 
type PartialPointX = {
  x: number;
}
type Point = PartialPointX & {
  y: number;
} 
*/

// interface extends type alias
/* 
type PartialPointX = {
  x: number;
}
interface Point extends PartialPointX {
  y: number;
}
*/

// type alias extends interface
/* 
interface PartialPointX {
  x: number;
}
type Point = PartialPointX & {
  y: number;
}
 */

// 实现接口
interface Point {
  x: number;
  y: number;
}
class SomePoint implements Point {
  x = 1;
  y = 2;
}

// 实现type
type Point2 = {
  x: number;
  y: number;
};
class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

// interface vs type
/* 
相同点
    都可以用来描述对象的形状或函数签名
    都允许拓展——效果差不多，但是语法不同
不同点
    type 可以声明基本类型别名，联合类型，元组等类型
    interface 可以声明合并
场景
    说法1:
        定义一个变量类型用type，但如果是能够继承并约束的，就用interface。
        如果你不知道该用哪个，说明只是想定义一个类型而非接口，所以应该用type。
    说法2:
        两种场景可能会使用到type而不能用interface：
            具体定义数组每个位置的类型
            type PetList = [Dog, Pet]

            限定具体几个值的基本类型联合类型
            type someAnimal = 'dog' | 'cat'
    说法3:
        需要语义化 普通类型或者组合类型 我就用 type 给他们取一个语义化的名字
            type dogName = string
            type catAge = number
            // type fuckme = man | woman
        只要是对象类型. 统一使用 interface
 */
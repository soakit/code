// helloWorld不可变，类型为"Hello World"，而非string
const helloWorld = "Hello World";

// let值可变，因此编译器申明为string
let hiWorld = "Hi World";

// 类似枚举值的使用
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // ERROR

// 字符串字面量区分重载
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): HTMLElement | void { // void要删除
  // ... code goes here ...
}
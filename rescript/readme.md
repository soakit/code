# 介绍

ReScript是由张宏波于2015年设计的一门`静态函数式`语言,其核心团队遍布中国，美国和欧洲,有自己的非盈利组织: ReScript Association。

ReScript虽然仍然是一门相对小众语言，但其已经被很多商业公司使用， 其中既有互联网巨头`Facebook`，也不乏独角兽公司如`Wolt.com`, `TinyMCE`, 更有众多区块链创业公司，甚至被包括伊朗的公司使用； 其英文官方文档也被翻译成葡萄牙语，韩语等，是第一个由华人参与主导且具有一定国际影响力的程序语言。

愿景是成为JS平台大规模软件开发下`性能最好`的宿主语言 （编译性能和运行性能）感觉离这个目标越来越近了。


# 快速开始

## 安装使用

```shell
git clone https://gitee.com/rescript/rescript-template
cd rescript-template
npm install # 安装
npx rescript build -w # 构建并处于监听模式
```

## 在线体验
https://rescript-lang.org/try


参考链接：

https://zhuanlan.zhihu.com/p/382098633

[翻译《Thinking in ReScript》](https://zhuanlan.zhihu.com/p/404476040)

[有趣的 ReScript Polymorphic Variants](https://zhuanlan.zhihu.com/p/408015972)

[todolist](https://zhuanlan.zhihu.com/p/412050290)

## 优势

1. 重构起来非常方便(fearless refactoring) 
2. 类型系统是可靠的 不会运行时发生类型错误
3. 可以生成非常高效的代码

```ts
interface T {
    x: number;
}

let a: T = { x: 3};
let b: {
    x: number | string
} = a;

b.x = 'unsound';
let x: number = a.x; // 编译通过

a.x.toFixed(0); // 运行时出错

```

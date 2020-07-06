/*
写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
    F(0) = 0,   F(1) = 1
    F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
    斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
*/

/**
 * @param {number} n
 * @return {number}
 */

// 解法1
// a1初始值F(0)，a2初始为F(1)
var fib = function (n, a1 = 0, a2 = 1) {
  return n == 0 ? a1 % 1000000007 : fib(n - 1, a2 % 1000000007, a1 + a2);
};

// 解法2
var fib = function (n) {
  if (n <= 1) return n;
  // a初始值为F(1)，b初始值为F(2)，
  let a = 1;
  let b = 1;
  let temp;
  for (let i = 3; i <= n; i++) {
    temp = a;
    a = b;
    b = (temp + b) % 1000000007;
  }
  return b;
};

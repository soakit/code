/*
实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。
示例 1:
    输入: 2.00000, 10
    输出: 1024.00000
说明:
    -100.0 < x < 100.0
    n 是 32 位有符号整数，其数值范围是 [−2^31, 2^31−1] 。
*/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    // 剪枝
    if (n === 0) {
        if (x === 0) {
            throw new Error('没有0的0次方！')
        }
        return 1
    }
    if (n < 0) {
        if (x === 0) {
            throw new Error('负数的底数不能为0')
        }
        return 1.0 / myPow(x, -n)
    }

    var r = myPow(x, n / 2)
    return n & 1 ? r * r * x : r * r
};

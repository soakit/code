/* 
    第415题：字符串相加
    给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (a, b) {
  const aLen = a.length;
  const bLen = b.length;
  const max = Math.max(aLen, bLen);

  let res = "",
    carryOut = false;
  for (let i = 0; i < max; i++) {
    let tA = a[aLen - 1 - i];
    let tB = b[bLen - 1 - i];

    if (i >= aLen) {
      if (!carryOut) {
        return b.substring(0, bLen - i) + res;
      }
      tA = 0;
    } else if (i >= bLen) {
      if (!carryOut) {
        return a.substring(0, aLen - i) + res;
      }
      tB = 0;
    }

    let tSum = tA - 0 + (tB - 0);
    if (carryOut) {
      tSum += 1;
      carryOut = false;
    }
    if (tSum > 9) {
      res = (tSum % 10) + res;
      carryOut = true;
    } else {
      res = tSum + res;
    }
  }
  if (carryOut) {
    return 1 + res;
  }
  return res;
};

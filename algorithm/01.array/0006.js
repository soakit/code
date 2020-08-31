/* 
第6题：Z 字形变换
将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
  L    C     I    R
  E T O E S  I  I  G
  E    D    H    N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。
请你实现这个将字符串进行指定行数变换的函数：
string convert(string s, int numRows);

示例 1:
    输入: s = "LEETCODEISHIRING", numRows = 3
    输出: "LCIRETOESIIGEDHN"
*/
// 每 2n-2 即为一个周期
var convert = function (s, numRows) {
  if (numRows == 1) return s;
  const arr = new Array(numRows);
  arr.fill('')
  const len = s.length;
  let period = numRows * 2 - 2;
  for (let i = 0; i < len; i++) {
    let mod = i % period;
    if (mod < numRows) {
      arr[mod] += s[i];
    } else {
      arr[period - mod] += s[i];
    }
  }
  var res = ''
  for (const ch of arr) {
    if (ch) {
      res += ch;
    }
  }
  return res;
};
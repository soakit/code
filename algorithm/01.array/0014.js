/* 
第14题：最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1:
    输入: ["flower","flow","flight"]
    输出: "fl"
示例 2:
    输入: ["dog","racecar","car"]
    输出: ""
    解释: 输入不存在公共前缀。 
*/
var longestCommonPrefix = function (str) {
  // 剪枝
  if (str.length < 1) {
    return "";
  }
  // 1. 取数组中的第一个串
  // 2. 从第二项开始遍历数组
  // 3. 两两比较取得公共前缀的最长索引(先取得第一个串和第二个串的公共前缀的最长索引A，
  // 然后再在索引A内比较第一个串和第三个串取得索引B，以此类推，得出索引N)
  // 4. 截取第一个串的[0, N)
  const firstStr = str[0];
  let len = firstStr.length;
  for (let i = 1; i < str.length; i++) {
    const tmp = str[i];
    for (let j = 0; j < len; j++) {
      if (firstStr[j] !== tmp[j]) {
        len = j;
        break;
      }
    }
  }
  return firstStr.slice(0, len);
};

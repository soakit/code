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
var longestCommonPrefix = function(strs) {
    if (strs.length < 1) {
      return ''
    }
    const commonPrefix = strs[0]
    let len = commonPrefix.length
    for (let i=1; i<strs.length; i++) {
      let str = strs[i]
      for (let j=0; j<len; j++) {
        if (commonPrefix[j] !== str[j]) {
          len = j
          break
        }
      }
    }
    return commonPrefix.slice(0, len)
  };
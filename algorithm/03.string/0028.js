/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  // null, undefined, ""
  if (needle !== "0" && !needle) {
    return 0;
  }
  if (haystack === null || haystack === undefined) {
    return 0;
  }
  if (haystack.length < needle.length) {
    return -1;
  }
  let isFind = true;
  const haystackLen = haystack.length;
  const needleLen = needle.length;
  const last = needleLen - 1;
  // 循环区间[0, haystackLen - needleLen]
  for (let i = 0; i <= haystackLen - needleLen; i++) {
    if (haystack[i] === needle[0] && haystack[i + last] === needle[last]) { // 比较首尾
      for (let j = 1; j < last; j++) { // 除开首尾的循环比较
        if (haystack[i + j] !== needle[j]) { // 不同则跳出
          isFind = false;
          break;
        } else {
          isFind = true;
        }
      }
      if (isFind) { // 循环完始终是相同的，说明找到了索引
        return i;
      }
    }
  }
  return -1;
};

/* 
    第387题：字符串中的第一个唯一字符
    给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1 。 
*/
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  if (!s) {
    return -1;
  }
  if (s.length <= 1) {
    return 0;
  }
  const obj = {};
  // 用双指针，减少循环次数
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (obj[s[i]] !== undefined) {
      obj[s[i]] = -1;
    } else {
      obj[s[i]] = i;
    }
    if (obj[s[j]] !== undefined) {
      obj[s[j]] = -1;
    } else {
      obj[s[j]] = j;
    }
  }
  if (s.length & 1) {
    // 奇数，处理中间数
    const middle = (s.length - 1) / 2;
    if (obj[s[middle]] !== undefined) {
      obj[s[middle]] = -1;
    } else {
      obj[s[middle]] = middle;
    }
  }
  // 存的索引不为-1即为首个唯一字符
  for (let i = 0; i < s.length; i++) {
    if (obj[s[i]] !== -1) {
      return obj[s[i]];
    }
  }
  return -1;
};

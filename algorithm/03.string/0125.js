/* 
    第125题：验证回文串
    给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 */
var isPalindrome = function (str) {
  const len = str.length;
  if (len <= 1) {
    return true;
  }
  const reg = /^[a-z0-9]$/;
  for (let i = 0, j = len - 1; i < j; ) {
    const letter1 = str[i].toLowerCase();
    const letter2 = str[j].toLowerCase();
    if (!reg.test(letter1)) {
      i++;
      continue;
    }
    if (!reg.test(letter2)) {
      j--;
      continue;
    }
    if (letter1 !== letter2) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

/* 
    第796题：旋转字符串
    给定两个字符串, A 和 B。A 的旋转操作就是将 A 最左边的字符移动到最右边。
    例如, 若 A = 'abcde'，在移动一次之后结果就是'bcdea' 。如果在若干次旋转操作之后，A 能变成B，那么返回True。 
*/
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var rotateString = function(A, B) {
    // 剪枝1
    if (A === "" && B === "") {
        return true;
    }
    const aLen = A.length;
    const bLen = B.length;
    // 剪枝2
    if (aLen !== bLen) {
      return false;
    }
    for (let i = 0; i < aLen; i++) {
        // 移动n次，即索引n处分割字符串
        // 然后将分割后的字符串尾首相连(相连前先比较串尾、串首的首尾是否与目标字符串相等)
        // 最后再与目标字符串比较
        const last = A.substring(i, aLen);
        if (
          last[0] !== B[0] || 
          last[last.length - 1] !== B[last.length - 1]
        ) {
          continue;
        }
        const first = A.substring(0, i);
        if (
          first[0] !== B[last.length] || 
          first[first.length - 1] !== B[bLen - 1]
        ) {
          continue;
        }
        if (last + first === B) {
            return true;
        }
    }
    return false;
  };
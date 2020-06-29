/* 
请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
示例 1：
    输入：s = "We are happy."
    输出："We%20are%20happy."
 */
// 正则
var replaceSpace = function(s) {
    return s.replace(/ /g, '%20')
};

// 数组处理
var replaceSpace = function(s) {
    const arr = []
    const space = '%20'
    for (let i=0; i<s.length; i++) {
        const tmp = s[i]
        if (tmp !== ' ') {
            arr.push(tmp)
        } else {
            arr.push(space)
        }
    }
    return arr.join('')
}
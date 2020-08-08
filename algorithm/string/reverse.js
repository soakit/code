/* 
    假设给定一个由字母和小数点组成的字符串，把字符串按块翻转，其中连续的小数点为一块，连续的字母为一块。
    例如 'ab..bc...cd.' 翻转后为 '.cd...bc..ab'。 
*/

var reverseStr = function (str) {
    var isSameType = function (str1, str2) {
        var reg = /[a-z]/
        if (str1 === str2 || (reg.test(str1) && reg.test(str2))) {
            return true
        }
        return false
    }
    var newStr = '';
    var last = str[str.length - 1]
    for (var i = str.length - 2; i >= 0; i--) {
        if (isSameType(str[i], str[i + 1])) {
            last = str[i] + last
        } else {
            newStr += last
            last = str[i];
        }
    }
    newStr += last
    return newStr
}

// test
reverseStr('ab..bc...cd.')
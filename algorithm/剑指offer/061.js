/* 
    从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
    2～10为数字本身，A为1，J为11，Q为12，K为13，
    而大、小王为 0 ，可以看成任意数字。
    A 不能视为 14。
示例 1:
    输入: [1,2,3,4,5]
    输出: True
示例 2:
    输入: [0,0,1,2,5]
    输出: True 
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
    const obj = {}
    let min = Number.MAX_VALUE
    let max = Number.MIN_VALUE
    for (let i = 0; i < nums.length; i++) {
        const tmp = nums[i]
        if (tmp === 0) {
            continue;
        }
        min = Math.min(tmp, min)
        max = Math.max(tmp, max)
        if (obj[tmp] === undefined) {
            obj[tmp] = 0
        }
        obj[tmp]++
        if (obj[tmp] > 1) {
            return false
        }
    }
    return max - min < 5
};
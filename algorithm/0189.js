/* 
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:
    输入: [1,2,3,4,5,6,7] 和 k = 3
    输出: [5,6,7,1,2,3,4]
解释:
    向右旋转 1 步: [7,1,2,3,4,5,6]
    向右旋转 2 步: [6,7,1,2,3,4,5]
    向右旋转 3 步: [5,6,7,1,2,3,4] 
*/
// 解法1
var rotate = function (nums, k) {
    // 剪枝
    var len = nums.length
    var remainder = k % len
    if (!remainder) {
        return nums
    }

    // 数组首位插入O(n)
    nums.unshift(...nums.splice(len - remainder))
    // nums.unshift(...nums.splice(len - remainder))
    // nums.splice(0, 0, ...nums.splice(len - remainder))
};
// 解法2
var rotate = function (nums, k) {
    // 剪枝
    var len = nums.length
    var remainder = k % len
    if (!remainder) {
        return nums
    }
    var obj = {}
    for (let i = 0; i < len; i++) {
        // 把原来的值存放起来
        obj[i] = nums[i]
        const j = len - remainder + i
        if (j >= len) {
            nums[i] = obj[j % len]
        } else {
            nums[i] = nums[j]
        }
    }
    return nums
};

// test
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))
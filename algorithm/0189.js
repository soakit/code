/* 
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:
    输入: [1,2,3,4,5,6,7] 和 k = 3
    输出: [5,6,7,1,2,3,4]
解释:
    向右旋转 1 步: [7,1,2,3,4,5,6]
    向右旋转 2 步: [6,7,1,2,3,4,5]
    向右旋转 3 步: [5,6,7,1,2,3,4]
说明:
    尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
    要求使用空间复杂度为 O(1) 的 原地 算法。
*/
// 解法1
var rotate = function (nums, k) {
    // 剪枝
    var len = nums.length
    if (len <= 1) {
        return
    }
    k = k % len
    if (!k) {
        return nums
    }

    // 数组首位插入O(n)
    nums.unshift(...nums.splice(len - k))
    // nums.unshift(...nums.splice(len - k))
    // nums.splice(0, 0, ...nums.splice(len - k))
};
// 解法2
var rotate = function (nums, k) {
    // 剪枝
    const len = nums.length;
    if (len <= 1) {
        return
    }
    k %= len;
    if (!k) {
        return
    }
    const reverse = function (nums, start, end) {
        while (start < end) {
            nums[start] ^= nums[end];
            nums[end] ^= nums[start];
            nums[start] ^= nums[end];
            start++
            end--
        }
    };
    /**
     * 1. 反转数组
     * 2. 反转k前面的
     * 3. 反转k后面的
     */
    reverse(nums, 0, len - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, len - 1)
};

// test
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))
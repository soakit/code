/**
    给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

    示例:
        输入: [0,1,0,3,12]
        输出: [1,3,12,0,0]
    说明:
        必须在原数组上操作，不能拷贝额外的数组。
        尽量减少操作次数。
 */

// 解法1: 将0与非0的交换
var moveZeroes = function (nums) {
    /**
     * 1.   假定第一个数为0，即0位置的索引为0
     * 2.   找到不为0的元素
     * 2.1  如果当前索引大于0位置的索引，则交换。
     * 2.2  0位置的索引累加
     */
    const len = nums.length
    // 剪枝
    if (len <= 1) {
        return nums
    }
    var zeroPos = 0;
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            if (i > zeroPos) {
                // 交换值
                // [nums[zeroPos], nums[i]] = [nums[i], nums[zeroPos]]
                nums[zeroPos] ^= nums[i]
                nums[i] ^= nums[zeroPos]
                nums[zeroPos] ^= nums[i]
            }
            zeroPos++;
        }
    }
    return nums
};
// 解法2
var moveZeroes = function (nums) {
    /**
     * 1.   遍历数组，将非0项从头开始塞到数组中
     * 1.1  所有非0项被安排到数组的前头，然后将剩下的项覆盖为0
     * 2.   非0项安排完，剩下的就是0项的了
     */
    const len = nums.length
    // 剪枝
    if (len <= 1) {
        return nums
    }
    let notZeroIndex = 0
    for (let i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            nums[notZeroIndex] = nums[i]
            notZeroIndex++
        }
    }
    for (let i = notZeroIndex; i < len; i++) {
        nums[i] = 0
    }
    return nums
};

// test
moveZeroes([0, 1, 0, 3, 12])

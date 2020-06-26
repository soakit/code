/**
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
示例:
    给定数组 nums = [1,1,2], 
    函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 
    你不需要考虑数组中超出新长度后面的元素。
 */
var removeDuplicates = function (nums) {
    /**
     * 1.   从第2项开始遍历数组，初始重复个数为0
     * 2.   比较当前项与前一项
     * 3.1  相等则将当前元素赋给首次出现重复的元素(其索引为当前索引-count)
     * 3.2  不等则重复个数累加
     */
    var len = nums.length;
    // 剪枝
    if (len <= 1) {
        return nums.length
    }
    var count = 0;
    for (var i = 1; i < len; i++) {
        if (nums[i] !== nums[i - 1]) {
            // 当前首次出现重复元素的索引为 i - count
            nums[i - count] = nums[i]
        } else {
            // 重复个数计数
            count++
        }
    }
    return nums.length - count
};

// test
removeDuplicates([1, 1, 2])
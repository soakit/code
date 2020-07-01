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
    const len = nums.length;
    // 剪枝
    if (len <= 1) {
        return nums.length
    }
    let count = 0 // 重复的个数
	for (let i=1; i< len; i++) {
		const tmp = nums[i]
		// 当前的与前一个相比较
		if (tmp === nums[i -1]) {
			count++
		} else {
			// 当前出现重复元素的索引为i - count
			nums[i - count] = tmp
		}
	}
    return len - count
};

// test
removeDuplicates([1, 2, 2, 3, 4, 4, 5])
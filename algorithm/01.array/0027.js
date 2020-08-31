/* 
第27题. 移除重复元素
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1:
    给定 nums = [3,2,2,3], val = 3,
    函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
    你不需要考虑数组中超出新长度后面的元素。
示例 2:
    给定 nums = [0,1,2,2,3,0,4,2], val = 2,
    函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
    注意这五个元素可为任意顺序。
    你不需要考虑数组中超出新长度后面的元素。 
*/

// 解法1: 使用临时变量存储当前的不重复位置，此法不改变元素的相对位置
var removeElement = function(nums, val) {
    let index = 0;
    const len = nums.length
    for (let i=0; i<len;i++) {
        const tmp = nums[i]
        if (tmp !== val) {
            nums[index] = tmp
            index++;
        }
    }
    return index
};

// 解法2: 双指针；不等时左指针右移、相等时将右指针位置值赋给左指针，然后右指针左移
var removeElement = function(nums, val) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right){
        if (nums[left] !== val){
            left++;
        } else{
            nums[left] = nums[right];
            right--;
        }
    }
    return left;
}
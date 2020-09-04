/* 
第350题：两个数组的交集
给定两个数组，编写一个函数来计算它们的交集。

示例 1:
    输入: nums1 = [1,2,2,1], nums2 = [2,2]
    输出: [2,2]
示例 2:
    输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    输出: [4,9]
说明：
    输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
    我们可以不考虑输出结果的顺序。
 */
const intersect = (nums1, nums2) => {
  const map = {};
  const arr = [];
  for (const num of nums1) {
    // 存下nums1数字的出现次数
    if (map[num]) {
      map[num]++;
    } else {
      map[num] = 1;
    }
  }
  for (const num of nums2) {
    // 遍历nums2看看有没有数字在nums1出现过
    const val = map[num];
    if (val > 0) {
      // 出现过
      arr.push(num); // 推入res数组
      map[num]--;  // 匹配掉一个，就少了一个
    }
  }
  return arr;
};

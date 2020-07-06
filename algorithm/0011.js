/*
给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。
*/
/**
 * @param {number[]} height
 * @return {number}
 */
/**
    首尾两个指针，左指针，右指针
    左指针右移，右指针左移，都会带来宽度的减小，要想面积有变大的可能
    就要高度要变大，又根据木桶原理，高度由较矮的bar高决定
    因此移动较矮的指针，看看能不能面积变大
 */
var maxArea = function (height) {
  let max_area = 0;
  let left = 0,
    right = height.length - 1;
  while (left < right) {
    const curArea = (right - left) * Math.min(height[left], height[right]);
    if (curArea > max_area) {
      max_area = curArea;
    }
    if (height[left] < height[right]) {
      left++; // 左边较矮，往右移，或许会变高
    } else {
      right--; // 右边较矮，往左移，或许会变高
    }
  }
  return max_area;
};

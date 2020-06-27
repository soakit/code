/* 
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
说明:
    初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
    你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
示例:
    输入:
        nums1 = [1,2,3,0,0,0], m = 3
        nums2 = [2,5,6],       n = 3
    输出: [1,2,2,3,5,6]
 */

var merge = function (nums1, m, nums2, n) {
    // 从后向前插入
    // l 表示从后向前当前插入位置
    let l = m + n - 1;
    // i 标记数组 nums1 当前比较位置
    let i = m - 1;
    // j 标记数组 nums2 当前比较位置
    let j = n - 1;
    // 将数组 nums 2 全部数据插入到数组 nums1 为止
    while (i >= 0 && j >= 0) {
        // 当数组 nums1 当前可比较数据位 i 大于等于 0 并且数组 nums1 当前位置值比 nums2 当前位置值大时，将数组 nums1 当前位置数组 插入到 l 位置 ，i 位指针向前挪一位
        // 否则将 nums2 当前位置数据插入到 l 位置，j 位指针向前挪一位
        // 当前插入位置 l 向前挪一位
        nums1[l--] = nums1[i] >= nums2[j] ? nums1[i--] : nums2[j--]
    }
    while (i >= 0) {
        nums1[l--] = nums1[i--]
    }
    while (j >= 0) {
        nums1[l--] = nums2[j--]
    }
};
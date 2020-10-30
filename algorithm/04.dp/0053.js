/* 
    第53题：最大子序和
    给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。 
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length < 1) {
    return 0;
  }
  const dp = [];
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (dp[i - 1] < 0) {
      dp[i] = nums[i];
    } else {
      dp[i] = nums[i] + dp[i - 1];
    }
  }

  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < dp.length; i++) {
    max = Math.max(dp[i], max);
  }

  return max;
};

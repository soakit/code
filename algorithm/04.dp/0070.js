/* 
    第70题：爬楼梯
    假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？ **注意：**给定 n 是一个正整数。 
*/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }
  // 一步一走有2种解法
  // 两步一走有1种解法
  let oneStepWay = 2;
  let twoStepWay = 1;
  let allWays = 0;

  for (let i = 2; i < n; i++) {
    allWays = oneStepWay + twoStepWay;
    twoStepWay = oneStepWay;
    oneStepWay = allWays;
  }
  return allWays;
};

// dp公式
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }
  var dp = [];
  dp[0] = 1;
  dp[1] = 2;
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};

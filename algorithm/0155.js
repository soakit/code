/* 
  设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
    push(x) —— 将元素 x 推入栈中。
    pop() —— 删除栈顶的元素。
    top() —— 获取栈顶元素。
    getMin() —— 检索栈中的最小元素。
  示例:
    输入：
    ["MinStack","push","push","push","getMin","pop","top","getMin"]
    [[],[-2],[0],[-3],[],[],[],[]]
  输出：
    [null,null,null,null,-3,null,0,-2] 
*/

// 最小栈存储的不应该是真实值，而是真实值和min的差值
// top的时候涉及到对数据的还原，这里千万注意是上一个最小值
var MinStack = function () {
  this.stack = [];
  this.minV = Number.MAX_VALUE;
};

MinStack.prototype.push = function (x) {
  const minV = this.minV;
  // 更新最小值
  if (x < this.minV) {
    this.minV = x;
  }
  // 放入与当前最小值(插入前)的差值
  return this.stack.push(x - minV);
};

MinStack.prototype.pop = function () {
  const item = this.stack.pop();
  const minV = this.minV;
  // 差值小于0，说明当前值(比最小值还小)为最小值
  if (item < 0) {
    // 还原最小值
    this.minV = minV - item;
    return minV;
  }
  return item + minV;
};

MinStack.prototype.top = function () {
  // 与pop类。没有pop，因此无需还原最小值
  const item = this.stack[this.stack.length - 1];
  const minV = this.minV;
  if (item < 0) {
    return minV;
  }
  return item + minV;
};

MinStack.prototype.getMin = function () {
  return this.minV;
};

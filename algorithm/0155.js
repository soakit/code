/* 
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
    push(x) —— 将元素 x 推入栈中。
    pop() —— 删除栈顶的元素。
    top() —— 获取栈顶元素。
    getMin() —— 检索栈中的最小元素。
*/
/**
 * initialize your data structure here.
 */
// 最小栈存储的不应该是真实值，而是真实值和min的差值
// top的时候涉及到对数据的还原，这里千万注意是上一个最小值
var MinStack = function () {
  this.stack = [];
  this.minV = Number.MAX_VALUE;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  // update 'min'
  const minV = this.minV;
  if (x < this.minV) {
    this.minV = x;
  }
  return this.stack.push(x - minV);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const item = this.stack.pop();
  const minV = this.minV;

  if (item < 0) {
    this.minV = minV - item;
    return minV;
  }
  return item + minV;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const item = this.stack[this.stack.length - 1];
  const minV = this.minV;

  if (item < 0) {
    return minV;
  }
  return item + minV;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minV;
};

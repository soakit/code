/* 
    第110题：平衡二叉树
    给定一个二叉树，判断它是否是高度平衡的二叉树。 
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  var balanceFn = function (node) {
    if (!node) return 0;
    const left = balanceFn(node.left);
    const right = balanceFn(node.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    }
    return Math.max(left, right) + 1;
  };
  return balanceFn(root) !== -1;
};

/**
输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

示例，给出
    前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
返回二叉树
    3
   / \
  9  20
    /  \
   15   7
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 利用原理,先序遍历的第一个节点就是根。在中序遍历中通过根 区分哪些是左子树的，哪些是右子树的
// 左右子树，递归
const map = {}; // 标记中序遍历
let preOrderArr = []; // 保留的先序遍历

/**
 * @param {number[]} preOrder
 * @param {number[]} inOrder
 * @return {TreeNode}
 */
var buildTree = function (preOrder, inOrder) {
  preOrderArr = preOrder;
  for (let i = 0; i < preOrder.length; i++) {
    map[inOrder[i]] = i;
  }
  return recursive(0, 0, inOrder.length - 1);
};

/**
 * @param pre_root_idx  先序遍历的索引
 * @param in_left_idx  中序遍历的索引
 * @param in_right_idx 中序遍历的索引
 */
function recursive(pre_root_idx, in_left_idx, in_right_idx) {
  // 相等就是自己
  if (in_left_idx > in_right_idx) {
    return null;
  }
  // root_idx是在先序里面的
  var root = new TreeNode(preOrderArr[pre_root_idx]);
  // 有了先序的,再根据先序的，在中序中获 当前根的索引
  var idx = map[preOrderArr[pre_root_idx]];

  // 左子树的根节点就是 左子树的(前序遍历）第一个，就是+1,左边边界就是left，右边边界是中间区分的idx-1
  root.left = recursive(pre_root_idx + 1, in_left_idx, idx - 1);

  // 由根节点在中序遍历的idx 区分成2段,idx 就是根
  // 右子树的根，就是右子树（前序遍历）的第一个,就是当前根节点 加上左子树的数量
  // pre_root_idx 当前的根  左子树的长度 = 左子树的左边-右边 (idx-1 - in_left_idx +1) 。最后+1就是右子树的根了
  root.right = recursive(
    pre_root_idx + (idx - 1 - in_left_idx + 1) + 1,
    idx + 1,
    in_right_idx
  );
  return root;
}

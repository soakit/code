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
var isBalanced = function(root) {
    if (root == null) return true;

    if (!isBalanced(root.Left) || !isBalanced(root.Right)) {
        return false;
    }
    var leftH = getHeight(root.Left) + 1;     
    var rightH = getHeight(root.Right) + 1;   
    if (Math.abs(leftH-rightH) > 1) {
        return false;
    }
    return true;
};

function getHeight(root){
    if (root == null) {
        return 0;
    }
    return Math.max(getHeight(root.Left), getHeight(root.Right)) + 1;
}
/* 
输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

示例 1：
    输入：head = [1,3,2]
    输出：[2,3,1]
 */
var reversePrint = function (head) {
    if (head === null) {
        return []
    }
    var result = reversePrint(head.next);
    result.push(head.val)
    return result;
};

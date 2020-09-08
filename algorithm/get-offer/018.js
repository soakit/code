/* 
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
返回删除后的链表的头节点。
注意：此题对比原题有改动
示例 1:
    输入: head = [4,5,1,9], val = 5
    输出: [4,1,9]
    解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
/* var deleteNode = function(head, val) {
    // 会出现删除的是第一个节点
    // 新建一个空节点，指向头节点
    // 再从头节点开始查找，
    // 如果查找到了，就将当前节点的next指向当前节点next的next
    // 没有查找就继续
    // 最后返回头节点
    const temp = new ListNode(); 
    temp.next = head;

    let node = temp
    while(node.next) {
        if (node.next.val === val) {
            node.next = node.next.next;
            break;
        }
        node = node.next;
    }
    return temp.next;
}; */

/**
 * 用双指针
 * 1.pre, cur两个指针一步一步走，当走到要删除的节点(此时指向cur)时
 * 2.将pre的next指针指向cur的next，即实现了删除cur节点
 */
var deleteNode = function(head, val) {
    // 剪枝 如果删除的是第一个
    if (head && head.val === val) {
        return head.next
    }
    let pre = head
    let cur = head.next
    while(pre.val !== val && cur.val !== val){
        pre = pre.next
        cur = cur.next
    }
    pre.next = cur.next
    return head
};

/* 
第19题：删除链表倒数第N个节点
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
    给定一个链表: 1->2->3->4->5, 和 n = 2.
    当删除了倒数第二个节点后，链表变为 1->2->3->5. 
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head)
    let p1 = dummy
    let p2 = dummy
    let between = 0
    while (p2) {
      // 如果已经相隔n-1了，就同步一起走
      // 否则只让p2走
      p2 = p2.next
      if (between > n) {
        p1 = p1.next
      }
      between++;
    }
    let ptr = p1.next
    p1.next = ptr.next
    return dummy.next 
  };
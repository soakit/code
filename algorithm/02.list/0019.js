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
/* 
1. 使用哨兵节点，哨兵节点的下一节点为头节点
2. p1，p2都指向哨兵，走的距离between
3. 先只让p2往前走，当p1与p2的距离大于n时，让p1与p2一起往前走
4. 当p2走到尽头，将p1.next指向p1.next.next
5. 最后返回哨兵的下一节点
*/
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head)
    let p1 = dummy
    let p2 = dummy
    let between = 0
    while (p2) {
      // 如果已经相隔n了，就同步一起走
      // 否则只让p2走
      p2 = p2.next
      if (between > n) {
        p1 = p1.next
      }
      between++;
    }
    p1.next = p1.next.next
    return dummy.next 
  };
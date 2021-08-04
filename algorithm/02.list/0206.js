/* 
206. 反转链表 
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev; // 下一个指向前一个
    // 下轮循环处理
    prev = curr; // 当前的变成前一个 
    curr = next; // 下一个变成当前的
  }
  return prev; // 返回前一个
};

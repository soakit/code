/* 
    第2题：两数相加
    给出两个 非空 的链表用来表示两个非负的整数。
    其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。 
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const list = new ListNode();
  let plus = 0;
  let pointer = list;
  while (l1 || l2 || plus) {
    const num1 = l1 ? l1.val : 0;
    const num2 = l2 ? l2.val : 0;
    const sum = num1 + num2 + plus;
    if (sum > 9) {
      pointer.next = new ListNode(sum % 10);
      plus = 1;
    } else {
      pointer.next = new ListNode(sum);
      plus = 0;
    }
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
    pointer = pointer.next;
  }
  return list.next;
};

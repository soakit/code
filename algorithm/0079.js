/**
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。

示例 1：
    输入：board = [
        ["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]
    ], word = "ABCCED"
    输出：true
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const row = board.length;
  const col = board[0].length;
  const k = 0;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (findFn(board, word, x, y, k, row, col)) return true;
    }
  }
  return false;
};
// 用于判断board[x][y]的上下左右是否有work[k+1]，若有返回true
function findFn(board, word, x, y, k, row, col) {
  // 越界或不等就是没找到
  if (x < 0 || x >= row || y < 0 || y >= col || board[x][y] != word[k])
    return false;
  if (k == word.length - 1)
    // word到底了
    return true;
  let temp = board[x][y];
  board[x][y] = "-";
  let res =
    findFn(board, word, x - 1, y, k + 1, row, col) ||
    findFn(board, word, x, y + 1, k + 1, row, col) ||
    findFn(board, word, x + 1, y, k + 1, row, col) ||
    findFn(board, word, x, y - 1, k + 1, row, col); //上 右 下 左
  board[x][y] = temp;
  return res;
}

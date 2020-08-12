/* 
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
示例 1：
    输入：matrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]
    输出：[1,2,3,6,9,8,7,4,5] 
*/
// 从(0, 0)向右走，走到尽头就转向，右->下->左->上
var spiralOrder = function (matrix) {
    if (!matrix.length) {
        return []
    }
    let start_x = 0,
        start_y = 0,
        max_x = matrix[0].length,
        max_y = matrix.length,
        res = [],
        direction = 'right';

    while (res.length < matrix.length * matrix[0].length) {
        switch (direction) {
            case 'right':
                for (let i = start_x; i < max_x; i++) {
                    res.push(matrix[start_y][i])
                }
                start_y++;
                direction = 'bottom'
                break;
            case 'bottom':
                for (let i = start_y; i < max_y; i++) {
                    res.push(matrix[i][max_x - 1])
                }
                max_x--;
                direction = 'left'
                break;
            case 'left':
                for (let i = max_x - 1; i >= start_x; i--) {
                    res.push(matrix[max_y - 1][i])
                }
                max_y--;
                direction = 'top'
                break;
            case 'top':
                for (let i = max_y - 1; i >= start_y; i--) {
                    res.push(matrix[i][start_x])
                }
                start_x++;
                direction = 'right'
                break;
        }
    }
    return res;
}
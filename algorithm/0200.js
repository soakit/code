/* 
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。
示例 1:
    输入:
        [
            ['1','1','1','1','0'],
            ['1','1','0','1','0'],
            ['1','1','0','0','0'],
            ['0','0','0','0','0']
        ]
    输出: 1 
*/
var numIslands = function(grid) {
	let num=0;
	
	if (!grid || !grid.length) {
		return num
	}
	
	const maxRow = grid.length - 1;
	const maxCol = grid[0].length - 1;
	
	// 上下左右置0
	const overturn = function(i, j) {
		if (i<0 || j<0 || i>maxRow || j>maxCol) {
			return
		}
		if (grid[i][j] === '1') {
			grid[i][j] = '0'
			overturn(i, j-1)
			overturn(i, j+1)
			overturn(i-1, j)
			overturn(i+1, j)
		}
	}
	
	for (let i=0; i<= maxRow; i++) {
		for(let j=0; j<= maxCol; j++) {
			if (grid[i, j] === '1') {
				num++
				overturn(i, j) // 置0
			}
		}
	}
	
	return num;
}

// test
var arr = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
numIslands(arr)
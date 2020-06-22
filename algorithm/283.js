var moveZeroes = function (nums) {
    var zeroPos = 0;
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            if (i > zeroPos) {
                [nums[zeroPos], nums[i]] = [nums[i], nums[zeroPos]]
            }
            zeroPos++;
        }
    }
    return nums
};

// test
moveZeroes([1,2,0,3,12])

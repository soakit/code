var handleArr = function (arr, k) {
    let max = arr[0], maxIndex = 0
    for (var i = 1; i < arr.length; i++) {
        if (max <= arr[i]) {
            max = arr[i]
            maxIndex = i
        }
    }
    arr.splice(0, maxIndex)
}

var maxSlidingWindow = function (nums, k) {
    if (!k) { return []; }
    const maxArr = [];

    const start = k - 1
    var queueArr = nums.slice(0, start)
    for (var i = start; i < nums.length; i++) {
        queueArr.push(nums[i])
        handleArr(queueArr, k)
        maxArr.push(queueArr[0])
        if (queueArr.length === k) {
            queueArr.splice(0, 1)
        }
    }
    return maxArr
};

// console.log(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
// console.log(maxSlidingWindow([7, 2, 4], 2))
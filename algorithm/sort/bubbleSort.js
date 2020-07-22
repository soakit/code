function bubbleSort(arr) {
  let k = arr.length - 1;
  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1]) {
        // 大于则交换
        arr[j] ^= arr[j + 1];
        arr[j + 1] ^= arr[j];
        arr[j] ^= arr[j + 1];
        pos = j; // 记录当轮的冒泡的位置
      }
    }
    k = pos; // 下一轮只比较到上轮冒泡的位置即可
  }
  return arr;
}

// test
bubbleSort([1, 2, 5, 7, 4, 3, 6, 8, 9, 10]);

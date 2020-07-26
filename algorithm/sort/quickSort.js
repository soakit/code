function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  if (start === undefined) {
    start = 0;
    end = arr.length - 1;
  }

  var rStart = start, rEnd = end;
  var pivot = arr[Math.floor(Math.random() * (end - start + 1) + start)]; // 以随机索引为基准值
  while (start < end) {
    while (arr[start] <= pivot) start++;
    while (arr[end] > pivot) end--;
    if (start < end) {
      var temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
    }
  }
  quickSort(arr, rStart, start - 1);
  quickSort(arr, start, rEnd);
}

function quickSort(arr, start, end) {
  var pivot = arr[Math.floor((end + start) / 2)], // 以中间为基准值
    rStart = start, // 左指针
    rEnd = end; // 右指针
  while (rStart <= rEnd) {
    while (arr[rStart] < pivot) {
      rStart++;
    }
    while (arr[rEnd] > pivot) {
      rEnd--;
    }
    if (rStart <= rEnd) {
      var t = arr[rStart]
      arr[rStart] = arr[rEnd]
      arr[rEnd] = t
      rStart++;
      rEnd--;
    }
  }
  if (start < rStart - 1) { // 处理基准值左边
    quickSort(arr, start, rStart - 1);
  }
  if (rStart < end) { // 处理基准值右边
    quickSort(arr, rStart, end);
  }
  return arr;
}

function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  if (start === undefined) {
    start = 0;
    end = arr.length - 1;
  }

  var pivot = arr[start], temp; // 以第一个为基准值
  var ltPivotCount = start + 1; // 小于基准值的个数
  for (var i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      if (i != ltPivotCount) { // 顺序错位才交换值
        temp = arr[ltPivotCount];
        arr[ltPivotCount] = arr[i];
        arr[i] = temp;
      }
      ltPivotCount++;
    }
  }
  ltPivotCount -= 1 // 减1取索引

  arr[start] = arr[ltPivotCount];
  arr[ltPivotCount] = pivot;

  quickSort(arr, start, ltPivotCount - 1);
  quickSort(arr, ltPivotCount + 1, end);

  return arr
}

function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  if (start === undefined) {
    start = 0;
    end = arr.length - 1;
  }

  var pivot = arr[end], temp; // 以最后一个为基准值
  var index = start;

  for (var i = start; i < end; i++) {
    if (arr[i] < pivot) {
      if (i != index) {
        temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
      }
      index++;
    }
  }

  temp = arr[index];
  arr[index] = arr[end];
  arr[end] = temp;

  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);

  return arr
}

// test
var arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
console.log(quickSort(arr, 0, arr.length - 1))
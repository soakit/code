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
  var pointer = start + 1; // 从第二个开始
  for (var i = pointer; i <= end; i++) {
    if (arr[i] < pivot) {
      if (i != pointer) { // 顺序错位才交换值
        temp = arr[pointer];
        arr[pointer] = arr[i];
        arr[i] = temp;
      }
      pointer++;
    }
  }
  // 还原指针至前一位(循环完时，pointer处没有可处理项)
  pointer -= 1

  // pivot = arr[start]
  // 与上处一起，交换起始处与指针处的值
  arr[start] = arr[pointer];
  arr[pointer] = pivot;

  quickSort(arr, start, pointer - 1); // 处理起始至指针前一位
  quickSort(arr, pointer + 1, end); // 处理指针后一位至最后

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
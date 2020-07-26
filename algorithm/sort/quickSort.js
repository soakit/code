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
  var newStart = start + 1;
  for (var i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      if (i != newStart) {
        temp = arr[newStart];
        arr[newStart] = arr[i];
        arr[i] = temp;
      }
      newStart++;
    }
  }
  newStart -= 1

  arr[start] = arr[newStart];
  arr[newStart] = pivot;

  quickSort(arr, start, newStart - 1);
  quickSort(arr, newStart + 1, end);

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
  var newStart = start;

  for (var i = start; i < end; i++) {
    if (arr[i] < pivot) {
      if (i != newStart) {
        temp = arr[newStart];
        arr[newStart] = arr[i];
        arr[i] = temp;
      }
      newStart++;
    }
  }

  temp = arr[newStart];
  arr[newStart] = arr[end];
  arr[end] = temp;

  quickSort(arr, start, newStart - 1);
  quickSort(arr, newStart + 1, end);

  return arr
}

// test
var arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
console.log(quickSort(arr, 0, arr.length - 1))
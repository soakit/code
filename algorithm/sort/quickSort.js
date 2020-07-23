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
      console.log(arr)
    }
  }
  quickSort(arr, rStart, start - 1);
  quickSort(arr, start, rEnd);
}

function quickSort(arr, start, end) {
  var index;
  var pivot = arr[Math.floor((end + start) / 2)], // 以中间为基准值
    i = start, // 左指针
    j = end; // 右指针
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      var t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
      i++;
      j--;
    }
  }
  index = i;
  if (start < index - 1) { // 处理基准值左边
    quickSort(arr, start, index - 1);
  }
  if (index < end) { // 处理基准值右边
    quickSort(arr, index, end);
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

  var pivotIndex;
  var pivot = arr[start], pivotIndex = start + 1, temp; // 以第一个为基准值
  for (var i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      if (i != pivotIndex) {
        temp = arr[pivotIndex];
        arr[pivotIndex] = arr[i];
        arr[i] = temp;
      }
      pivotIndex++;
    }
  }
  pivotIndex -= 1

  arr[start] = arr[pivotIndex];
  arr[pivotIndex] = pivot;

  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);

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

  var pivotIndex;
  var pivot = arr[end], temp, pivotIndex = start; // 以最后一个为基准值

  for (var i = start; i < end; i++) {
    if (arr[i] < pivot) {
      if (i != pivotIndex) {
        temp = arr[pivotIndex];
        arr[pivotIndex] = arr[i];
        arr[i] = temp;
      }
      pivotIndex++;
    }
  }

  temp = arr[pivotIndex];
  arr[pivotIndex] = arr[end];
  arr[end] = temp;

  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);

  return arr
}

// test
var arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
console.log(quickSort(arr, 0, arr.length - 1))
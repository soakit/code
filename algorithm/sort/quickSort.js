function quickSort(array, left, right) {
  var length = array.length;
  (left = typeof left === "number" ? left : 0),
    (right = typeof right === "number" ? right : length - 1);

  if (left < right) {
    var index = left - 1;
    for (var i = left; i <= right; i++) {
      if (array[i] <= array[right]) {
        index++;
        var temp = array[index];
        array[index] = array[i];
        array[i] = temp;
      }
    }
    quickSort(array, left, index - 1);
    quickSort(array, index + 1, right);
  }
  return array;
}

// test
var arr = [1, 2, 5, 7, 4, 3, 6, 8, 9, 10];
quickSort(arr);

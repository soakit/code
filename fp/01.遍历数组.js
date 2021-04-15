// 练习 1: 打印数组中所有的名字
(function () {
  var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
    counter;

  for (counter = 0; counter < names.length; counter++) {
    console.log(names[counter]);
  }
})();

// 练习 2: 使用 forEach 打印数组中所有的名字
(function () {
  var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];

  names.forEach((name) => {
    console.log(name);
  });
})();

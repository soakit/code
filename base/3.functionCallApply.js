// 思路：将要改变this指向的方法挂到目标this上执行并返回
// 参数不固定，使用arguments配合eval
Function.prototype.mycall = function () {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  let [ctx, ...args] = arguments;
  ctx = Object(ctx) || window;

  // 用Symbol > 随机数 > 不常用的作为key，这里使用不常用的
  ctx.__fn__ = this;

  const newArgs = args.map((item, index) => {
    return `args[${index}]`;
  });

  var result = eval("ctx.__fn__(" + newArgs + ")");
  delete ctx.__fn__;
  return result;
};

// 思路：将要改变this指向的方法挂到目标this上执行并返回
// 第二个参数是数组，判断长度
Function.prototype.myapply = function () {
  if (typeof this !== "function") {
    throw new TypeError("not funciton");
  }
  let [ctx, ...args] = arguments;
  ctx = Object(ctx) || window;

  ctx.__fn__ = this;

  let result;
  if (!args.length) {
    result = ctx.__fn__();
  } else {
    const newArgs = args.map((item, index) => {
      return `args[${index}]`;
    });
    result = eval(`ctx.__fn__(${newArgs})`);
  }

  delete ctx.__fn__;
  return result;
};

// test
function haha(...args) {
  console.log(this.value, args);
}
var obj = {
  value: "haha",
};

haha.myapply(obj, ["apply args..."]);
haha.mycall(obj, "calll args...");

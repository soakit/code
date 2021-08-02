Function.prototype.before = function (beforeFn) {
  var self = this; //保存旧函数的引用
  return function () {
    //返回包含旧函数和新函数的“代理”函数
    beforefn.apply(this, arguments); //执行新函数,且保证this不被劫持,新函数接受的参数
    // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function (afterFn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};

var fn_aop = function () {
  console.log("fn...");
};

fn_aop = fn_aop
  .before(function () {
    console.log("before...");
  })
  .after(function () {
    console.log("after...");
  });
fn_aop();

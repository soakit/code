var throttle = function (fn, delay) {
  var canRun = true;

  return function (...args) {
    if (!canRun) {
      return;
    }
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay || 500);
  };
};

window.onresize = throttle(function () {
  console.log(1);
}, 500);

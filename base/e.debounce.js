var debounce = function (fn, delay) {
  var timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// test
document.getElementById("input").addEventListener(
  "keyup",
  debounce(function (e) {
    console.log(e.target.value);
  }, 200)
);

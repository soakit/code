// b.js
let obj = {
    count: 1
  }
  let plusCount = () => {
    obj.count++
  }
  setTimeout(() => {
    console.log('b.js-1', obj.count)
  }, 1000)
  setTimeout(() => {
    console.log('b.js-2', obj.count)
  }, 3000)
  module.exports = {
    obj,
    plusCount
  }
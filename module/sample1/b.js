let count = 1
let count2 = 1
let plusCount = () => {
    count += 2
}
let plusCount2 = () => {
    count2 += 2
}
setTimeout(() => {
    console.log('b.js-1, count', count)
    console.log('\tb.js-1, count2', count2)
}, 2000)
module.exports = {
    count,
    get count2() {
        return count2
    },
    set count2(newValue) {
        count2 = newValue
    },
    plusCount,
    plusCount2,
}
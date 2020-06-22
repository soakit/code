new Promise(resolve => {
    console.log('promise...')
    resolve('resolved...')
}).then(res => {
    console.log(res)
})

process.nextTick(() => {
    console.log('nextTick...')
})
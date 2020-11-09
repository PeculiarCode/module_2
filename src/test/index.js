const MyPromise = require('./promise')
let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    })
})
promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
})
promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
})
promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
})
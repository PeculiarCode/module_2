const MyPromise = require('./promise')
let promise = new MyPromise((resolve, reject) => {
    // throw new Error()
    setTimeout(() => {
        resolve(111)
    }, 1000)
})

// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('hello')
//     })
// }

//循环引用错误
/* let p1 = promise.then(res => {
    console.log(res);
    return p1
});
p1.then(res => {
    console.log(res,111);
}, rea => {
    console.log(rea,222);
}) */

// promise.then().then().then(res => {
//     console.log(res);
// })
function f1() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('err')
        }, 1000)
    })
}
// MyPromise.all(['1', f1()]).then(res => {
//     console.log(res);
// })

// MyPromise.resolve(promise).then(res=>{
//     console.log(res);
// })
// promise.then(res => {
//     console.log(res);
//     return f1()
// }).catch(err => {
//     console.log(err);
// })

function diff(arr) {
    //数组拷贝
    const copy = arr.slice()
    //数组排序从小到大
    arr.sort((a, b) => {
        return a - b
    })
    //找到数组元素最小值这个值就是买入的值
    let min = arr[0]
    //找到原始数组对应最小值的索引(不考虑重复值)
    // console.log(copy);
    let index = copy.indexOf(min)
    return index
    //卖出的值
}
const arr = [4, 5, 3]
// const copy = arr.slice()
// let res = arr.sort((a, b) => {
//     return a - b
// })
// console.log(res, copy);
const ret = diff(arr)
console.log(ret);
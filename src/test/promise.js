/* 模拟Promise实现,Promise就是一个class,在执行这个class会传递一个执行器(executor),执行器会立即执行 

1 Promise三种状态 pedding fulfilled rejected
2 状态只能从 pedding=>fulfilled pedding=>rejected 一旦状态改变就不可更改
3 resolve和rejected是用来更改promise状态的
4 then方法就是判断status的状态
5 then回调接收成功或失败的值 resolve(value)或reject(reason)



*/
const PEDDING = 'pedding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    //默认状态是pedding
    status = PEDDING
    value = ''
    reason = ''
    //实现promise的then链式调用
    successCallback = [] 
    failCallBack = []
    resolve = (value) => {
        //如果状态不是等待阻止程序向下执行
        if (this.status !== PEDDING) return
        this.status = FULFILLED
        this.value = value
        //this.successCallback存储数据[fn1,fn2,Ffn3,fn4]都是函数组成的数组
        while (this.successCallback.length) {
            this.successCallback.shift()()
        }
    }
    reject = (reason) => {
        if (this.status !== PEDDING) return
        this.status = REJECTED
        this.reason = reason
        while (this.failCallBack.length) {
            this.failCallBack.shift()()
        }
    }
    then(successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value)
        } else if (this.status === REJECTED) {
            failCallback(this.reason)
        } else {
            //等待 将then里面的回调函数赋值给定义的变量
            this.successCallback.push(successCallback)
            this.failCallBack.push(failCallback)
        }
    }
}
module.exports = MyPromise
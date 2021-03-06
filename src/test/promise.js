/* 
0 模拟Promise实现,Promise就是一个class,在执行这个class会传递一个执行器(executor),执行器会立即执行 
1 Promise三种状态 pedding fulfilled rejected
2 状态只能从 pedding=>fulfilled pedding=>rejected 一旦状态改变就不可更改
3 resolve和rejected是用来更改promise状态的
4 then方法就是判断status的状态
5 then回调接收成功或失败的值 resolve(value)或reject(reason)
6 then方法返回promise对象,下一个then方法接收的值依赖上一个then方法返回的值,默认不写返回undefined
7 all方法参数是数组,只要有一个失败promise返回失败结果,都是成功状态会按照参数顺序返回相应的结果(返回结果是promise实例)
8 resolve方法返回promise实例,普通值在内部会自动转换成promise实例
9 finally不管成功或失败都会执行,链式调用

*/
const PEDDING = 'pedding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    constructor(executor) {
        //确保立即执行没有错误
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
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
        //this.successCallback存储数据[fn1,fn2,fn3,fn4]都是函数组成的数组
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
        //实现then方法默认参数传递
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        //每一个then方法返回promise实例
        let promise = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                //异步代码确保获取promise这个参数
                setTimeout(() => {
                    try {
                        //判断x的值是普通值还是promise对象
                        //普通值就直接resolve
                        //如果是promise对象,查看promise对象返回结果
                        //根据返回结果用resolve或reject
                        let x = successCallback(this.value)
                        //公用函数处理x
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason)
                        resolvePromise(promise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            } else {
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value)
                            resolvePromise(promise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.failCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason)
                            resolvePromise(promise, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })
        return promise
    }
    catch(failCallback) {
        return this.then(undefined, failCallback)
    }
    finally(callback) {
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => value)
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    //all方法接收的参数是数组
    static all(array) {
        let result = []
        //确保all方法里面的参数全部获取到
        let index = 0
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i++) {
                const current = array[i];
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    addData(i, array[i])
                }
            }
        })
    }
}
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        reject(new TypeError('Circular reference error'))
    }
    //x是promise实例
    else if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}
module.exports = MyPromise
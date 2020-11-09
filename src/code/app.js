//eg1说出下列执行结果
var a = []
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[6]()
//在执行a[]()函数for循环已经执行结束,此时i结果是10,不管a[]()数组第几项执行结果都是10

//eg2 执行结果并解释
// var temp = 123
// if (true) {
//     console.log(temp)
//     let temp
// }
// 会报错在函数作用域let声明的变量不允许声明之前访问

//eg3 用es6语法找出数组最小值
var arr = [12, 34, 32, 89, 4]
arr.sort((a, b) => {
    return a - b
})
console.log(arr[0])

//eg4 var,let,const区别
//var声明的变量会发生变量提升,
//let声明的变量只在当前作用域内被访问,不会发生变量提升,不能再声明之前被访问
//const声明的变量是只读的且不可修改,但是const声明的对象是可以修改内部属性的

//eg5 说出结果并说明理由
var a = 10
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a);
        });
    }
}
 obj.fn() //20
 //obj.fn()得知fn中的this指向obj
 //在箭头函数中引用this实际上指向上一层作用域的this(fn),fn的this指向obj,所以这里的this指向obj

 //eg6 Symbol类型的用途
 //由于每一个Symbol的值都是不相等的,所以Symbol作为对象的属性名,可以保证属性不重名
 //读取到一个对象的Symbol属性,可以通过 Object.getOwnPropertySymbols()和Reflect.ownKeys()取到
 //使用 Symbol定义常量,这样就可以保证这一组常量的值都不相等

 //eg7 深浅拷贝
 //浅拷贝
 //1 浅拷贝是创建一个新对象,这个对象有着原始对象属性值的一份精确拷贝。
 //2 如果属性是基本类型,拷贝的就是基本类型的值,如果属性是引用类型,拷贝的就是内存地址,所以如果其中一个对象改变了这个地址,就会影响到另一个对象
 //深拷贝
 //深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
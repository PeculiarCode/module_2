const hello = (name: string) => {
    console.log(name)
}
hello('123')
function sum(...args: number[]) {
    return args.reduce((pre, cur) => pre + cur, 0)
}
const res = sum(1, 2, 3)
console.log(res)

//枚举类型
enum postStatus {
    success = 1,
    fail = 2,
    warning = 3,
}
const enum typeStatus {
    success = 'defi',
    warning = 'hello',
    error = 'err',
}

//函数 函数的返回值是一个string类型 function可以理解为一个管道有输入就有输出
//?表示改参数可选
function fn(a: number, b?: number): string {
    return 'hello'
}

interface Post {
    title: string
    desc: string
}
function print(post: Post) {
    console.log(post.title)
    console.log(post.desc)
}
print({
    title: 'hello',
    desc: 'world',
})
interface Catch {
    [key: string]: string
}
// const catch:Catch = {}
// catch.foo='foo'

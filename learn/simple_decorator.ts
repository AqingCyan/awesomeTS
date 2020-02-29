// 类的装饰器
// 装饰器本身就是一个函数
// 通过@符号使用
// 装饰器只对类进行修饰，因此，即使不创建实例，装饰器也会执行，创建多个实例，装饰器也只运行一次。它只对类进行修饰，因此，我们可以用它对类进行修改（增强）
// 类装饰器的参数是类的构造函数
// 装饰器从下到上，从右到左执行

// function testDecorator(flag: boolean) {
//   if (flag) {
//     return function(constructor: any) {
//       constructor.prototype.getName = () => {
//         console.log('decorator')
//       }
//     }
//   } else {
//     return function (constructor: any) {}
//   }
// }
//
// @testDecorator(true)
// class Test {
//
// }
//
// const test: any = new Test()


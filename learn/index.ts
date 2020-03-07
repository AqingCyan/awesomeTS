// 参数装饰器
// 第一个参数是原型，第二个是方法信息，第三个是参数的序号
function paramsDecorator(target: any, method: string, paramIndex: number): any {
  console.log(target, method, paramIndex)
}

class Test {
  getInfo(@paramsDecorator name: string, age: number) {

  }
}

const test = new Test()
test.getInfo('Aqing', 21)

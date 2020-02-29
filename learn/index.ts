// 访问器装饰器
// 参数和方法装饰器的参数一样
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
}

class Test {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  get name() {
    return this._name
  }

  @visitDecorator
  set name(name: string) {
    this._name = name
  }
}

const test = new Test('cyan')
test.name = 'aqing' // 因为 descriptor.writable = false 无法修改 会报错
console.log(test.name)

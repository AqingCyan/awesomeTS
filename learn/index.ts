// 普通方法，target 对应的是类的 prototype
// 方法的装饰器，在类创建好的时候就会立马装饰，不用等实例化
// 静态方法 target 对应的是类的 构造函数 constructor
// descriptor 可以对属性做一些编辑，类似于 Object.defineProperty
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target, key)
  descriptor.writable = false
  descriptor.value = function () {
    return 'decorator'
  }
}

class Test {
  name: string
  constructor(name: string) {
    this.name = name
  }
  @getNameDecorator
  getName() {
    return this.name
  }
}

const test = new Test('cyan')
// test.getName = () => '123' // descriptor.writable = false 外部无法改变getName方法
console.log(test.getName())

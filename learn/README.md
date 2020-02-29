# 学习装饰器部分知识

## 简单的类装饰器

- 类的装饰器
- 装饰器本身就是一个函数
- 通过@符号使用
- 装饰器只对类进行修饰，因此，即使不创建实例，装饰器也会执行，创建多个实例，装饰器也只运行一次。它只对类进行修饰，因此，我们可以用它对类进行修改（增强）
- 类装饰器的参数是类的构造函数
- 装饰器从下到上，从右到左执行

```typescript
function testDecorator(flag: boolean) {
  if (flag) {
    return function(constructor: any) {
      constructor.prototype.getName = () => {
        console.log('decorator')
      }
    }
  } else {
    return function (constructor: any) {}
  }
}

@testDecorator(true)
class Test {

}

const test: any = new Test()
```

## 高级一点的类装饰器

- new (...args: any[]) => {} 这代表它是一个构造函数

```typescript
function testDecorator() {
  return function<T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      name = 'aqing'
      getName() {
        return this.name
      }
    }
  }
}

const Test = testDecorator()(class {
  name: string
  constructor(name: string) {
    this.name = name
  }
})

const test = new Test('cyan')
console.log(test.getName())
```

## 方法装饰器

- 普通方法，target 对应的是类的 prototype
- 方法的装饰器，在类创建好的时候就会立马装饰，不用等实例化
- 静态方法 target 对应的是类的 构造函数 constructor
- descriptor 可以对属性做一些编辑，类似于 Object.defineProperty

```typescript
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
```

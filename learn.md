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

## 访问器装饰器

- 参数和方法装饰器的参数一样

```typescript
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
```

## 属性装饰器

- 可以使用属性装饰器去修改属性的descriptor，需要返回出去去替代属性的descriptor
- 当我们企图通过构造器去修改属性的值时，其实本质修改的是类prototype上的属性
- 下面例子中的name = 'Cyan' 实际写在了实例的 test 属性上，要访问被修改的值，可以通过实例的原型获取

```typescript
function nameDecorator(target: any, key: string): any {
  return {
     writable: false,
  }
}

class Test {
  @nameDecorator
  name = 'Cyan'
}

const test = new Test()
test.name = 'aqing' // 报错
console.log(test.name) // aqing
```

```typescript
function nameDecorator(target: any, key: string): any {
  target[key] = 'aqing'
}

class Test {
  @nameDecorator
  name = 'Cyan'
}

const test = new Test()
console.log(test.name) // Cyan
console.log((test as any).__proto__.name) // aqing
```
## 参数装饰器

第一个参数是原型，第二个是方法信息，第三个是参数的序号

```typescript
function paramsDecorator(target: any, method: string, paramIndex: number): any {
  console.log(target, method, paramIndex)
}

class Test {
  getInfo(@paramsDecorator name: string, age: number) {

  }
}

const test = new Test()
test.getInfo('Aqing', 21)
// Test { getInfo: [Function] } getInfo 0
```

## 装饰器的使用例子

```typescript
// 装饰器妙用
const userInfo: any = undefined

function catchError(message: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
      try {
        fn()
      } catch (e) {
        console.log(`UserInfo 不存在 ${message} 属性`)
      }
    }
  }
}

class Test {
  @catchError('name')
  getName() {
    return userInfo.name
  }

  getAge() {
    return userInfo.age
  }
}

const test = new Test()
test.getName() // undefined 没有 name 属性，但是被装饰器处理过，不会报错
// test.getAge() // undefined 没有 age 属性，会报错
```

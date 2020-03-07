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


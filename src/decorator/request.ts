import 'reflect-metadata'

enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
}

// 生成请求方法装饰器的工厂方法
const getRequestDecorator = (type: Methods) => {
  return (path: string) => {
    return (target: any, key: string) => {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)

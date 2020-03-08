import { RequestHandler, Router } from 'express'

export const router = Router()

enum Method {
  get = 'get',
  post = 'post',
}

export const controller = (target: any) => {
  for(let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Method = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler)
      } else {
        router[method](path, handler)
      }
    }
  }
}

// 中间件装饰器
export const use = (middleware: RequestHandler) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

// 生成请求方法装饰器的工厂方法
const getRequestDecorator = (type: string) => {
  return (path: string) => {
    return (target: any, key: string) => {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const get = getRequestDecorator('get')

export const post = getRequestDecorator('post')

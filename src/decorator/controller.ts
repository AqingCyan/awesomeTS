import { RequestHandler } from 'express'
import router from '../router'
import { Methods } from './request'

/**
 * controller 的装饰器，可以设置 prefix 路径
 * @param root {String} prefix 路径
 */
export const controller = (root: string) => (
  (target: new (...args: any[]) => any) => {
    for(let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
      const handler: any = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middleware) {
          router[method](fullPath, middleware, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
)

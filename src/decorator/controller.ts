import { RequestHandler } from 'express'
import router from '../router'
import { Methods } from './request'

/**
 * controller 的装饰器，可以设置 prefix 路径
 * @param root {String} prefix 路径
 */
export const controller = (root: string) => (
  (target: new (...args: any[]) => any) => {
    for (const key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
      const handler: any = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        // 使用多个中间件的情况下
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
)

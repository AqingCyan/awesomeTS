import 'reflect-metadata'
import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

/**
 * 中间件装饰器
 * @param middleware {RequestHandler} 中间件
 */
export const use = (middleware: RequestHandler) => (
  (target: CrowllerController | LoginController, key: string) => {
    // 取出原有的中间件队列，把传入的新中间件推入，再存入
    const originMiddleware = Reflect.getMetadata('middlewares', target, key) || []
    originMiddleware.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddleware, target, key)
  }
)

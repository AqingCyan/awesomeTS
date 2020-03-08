import 'reflect-metadata'
import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

/**
 * 中间件装饰器
 * @param middleware {RequestHandler} 中间件
 */
export const use = (middleware: RequestHandler) => {
  return (target: CrowllerController | LoginController, key: string) => {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

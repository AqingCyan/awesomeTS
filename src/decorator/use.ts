// 中间件装饰器
import 'reflect-metadata'
import {RequestHandler} from "express"

export const use = (middleware: RequestHandler) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

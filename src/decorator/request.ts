import 'reflect-metadata'
import { CrowllerController, LoginController } from '../controller'

export enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
}

/**
 * 生成请求方法装饰器的工厂方法
 * @param type {Methods} 请求方法类型
 */
const getRequestDecorator = (type: Methods) => (
  (path: string) => (
    (target: CrowllerController | LoginController, key: string) => {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  )
)

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)

import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util'

// 当描述文件不准确时，我们可以拓展它的类型
interface BodyRequest extends Request{
  body: { [key: string]: string | undefined }
}

@controller('/api')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false)
  }

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin: boolean = LoginController.isLogin(req)
    res.json(getResponseData<responseResult.isLogin>(isLogin))
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    const isLogin: boolean = LoginController.isLogin(req)
    if (isLogin) {
      res.json(getResponseData(true, '已经登录过啦'))
    } else if (password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData<responseResult.login>(true))
    } else {
      res.json(getResponseData<responseResult.login>(false, '密码不正确'))
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData<responseResult.logout>(true))
  }
}

import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, get, post } from '../decorator'
import { getResponseData } from "../utils/util"

// 当描述文件不准确时，我们可以拓展它的类型
interface BodyRequest extends Request{
  body: { [key: string]: string | undefined }
}

@controller
class LoginController {
  @post('/login')
  login(req: BodyRequest, res: Response) {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
      res.json(getResponseData(false, '已经登录过啦'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.json(getResponseData(true))
      } else {
        res.json(getResponseData(false, '密码不正确'))
      }
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: BodyRequest, res: Response) {
      const isLogin = req.session ? req.session.login : false
      if (isLogin) {
        res.send(`
          <html lang="zh">
            <body>
              <a href="/getData">爬取内容</a><br>
              <a href="/showData">展示内容</a><br>
              <a href="/logout">退出</a><br>
            </body>
          </html>
        `)
      } else {
        res.send(`
          <html lang="zh">
            <body>
            <form method="post" action="/login">
              <input type="password" name="password" />
              <button>提交</button>
            </form>
            </body>
          </html>`)
    }
  }
}

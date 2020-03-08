import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, get } from './decorators'

// 当描述文件不准确时，我们可以拓展它的类型
interface BodyRequest extends Request{
  body: { [key: string]: string | undefined }
}

@controller
class LoginController {
  @get('/login')
  login() {

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
      </html>
    `)
    }
  }
}

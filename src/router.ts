import fs from 'fs'
import path from 'path'
import {NextFunction, Request, Response, Router} from 'express'
import Crowller from './utils/crowller'
import CyanAnalyzer from './utils/cyanAnalyzer'
import { getResponseData } from './utils/util'

// 当描述文件不准确时，我们可以拓展它的类型
interface BodyRequest extends Request{
  body: { [key: string]: string | undefined }
}

const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

const router = Router()

router.get('/', () => {})

router.post('/login', (req: BodyRequest, res: Response) => {
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
})

router.get('/logout', (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

router.get('/getData', checkLogin, (req: BodyRequest, res: Response) => {
  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyzer = CyanAnalyzer.getInstance()
  new Crowller(url, analyzer)
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf8')
    res.json(getResponseData(JSON.parse(result)))
  } catch (e) {
    res.json(getResponseData(false, '数据不存在'))
  }
})

export default router

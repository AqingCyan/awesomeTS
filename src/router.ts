import {Request, Response, Router} from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

// 当描述文件不准确时，我们可以拓展它的类型
interface RequestWithBody extends Request{
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html lang="zh">
      <body>
      <form method="post" action="/getData">
        <input type="password" name="password" />
        <button>提交</button>
      </form>
      </body>
    </html>
  `)
})

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  if (password === '123') {
    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(analyzer, url)
    res.send('Get data success')
  } else {
    res.send(`${req.teacherName}: password Error`)
  }
})

export default router

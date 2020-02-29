import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import router from './router'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
// 自己定义.d.ts文件来进行类型融合，这也req上面就可以用teacherName的属性了
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'AqingCyan'
  next()
})
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})

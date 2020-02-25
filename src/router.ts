import {Request, Response, Router} from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyzer = DellAnalyzer.getInstance()
  new Crowller(analyzer, url)
  res.send('Get data success')
})

export default router

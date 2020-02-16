/**
 * 爬虫主体，负责读写内容
 */
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import DellAnalyzer from './dellAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  async getRawHtml() {
    const { text } = await superagent.get(this.url)
    return text
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess()
  }
}

const secret = 'secretKey'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
const analyzer = new DellAnalyzer()
new Crowller(analyzer, url)

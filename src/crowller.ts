import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

interface Course {
  title: string
  count: number
}

interface CourseResult {
  time: number
  data: Course[]
}

interface Content {
  [propsName: number]: Course[]
}

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private filePath = path.resolve(__dirname, '../data/course.json')

  getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Course[] = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      courseInfos.push({ title, count })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos,
    }
  }

  async getRawHtml() {
    const { text } = await superagent.get(this.url)
    return text
  }

  generateJsonContent(result: CourseResult) {
    let fileContent: Content = {}
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    }
    fileContent[result.time] = result.data
    return fileContent
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseResult = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseResult)
    this.writeFile(JSON.stringify(fileContent))
  }

  constructor() {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()

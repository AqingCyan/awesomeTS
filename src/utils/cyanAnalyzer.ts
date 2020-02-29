import cheerio from "cheerio"
import fs from "fs"
import { Analyzer } from "./crowller"

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

class CyanAnalyzer implements Analyzer {
  private static instance: CyanAnalyzer
  // 单例模式改造
  static getInstance() {
    if (!CyanAnalyzer.instance) {
      CyanAnalyzer.instance = new CyanAnalyzer()
    }
    return CyanAnalyzer.instance
  }

  // 内容抽取
  private static getCourseInfo(html: string) {
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

  // 数据处理成写入的格式
  private static generateJsonContent(result: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[result.time] = result.data
    return fileContent
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = CyanAnalyzer.getCourseInfo(html)
    const fileContent = CyanAnalyzer.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor() {}
}

export default CyanAnalyzer

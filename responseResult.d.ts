declare namespace responseResult {
  interface CourseItem {
    title: string
    count: number
  }

  interface DataStructor {
    [key: string]: CourseItem[]
  }

  export type isLogin = boolean
  export type login = boolean
  export type logout = boolean
  export type getData = boolean
  export type showData = DataStructor | boolean
}

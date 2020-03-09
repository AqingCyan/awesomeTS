import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, message } from 'antd'
import ReactEcharts from 'echarts-for-react'
import axios from 'axios'
import moment from 'moment'
import './style.css'

interface CourseItem {
  title: string
  count: number
}

interface State {
  isLogin: boolean
  loaded: boolean
  data: {
    [key: string]: CourseItem[]
  }
}

interface LineData {
  name: string
  type: string
  data: number[]
}

// 可以传入两个范型分别指定props和state的类型
class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      loaded: false,
      isLogin: true,
      data: {},
    }
  }

  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loaded: true,
        })
      } else {
        this.setState({
          loaded: true,
        })
      }
    })

    axios.get('/api/showData').then((res) => {
      if (res.data?.data) {
        this.setState({
          data: res.data.data,
        })
      }
    })
  }

  handleLogoutClick = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data?.data) {
        this.setState({
          isLogin: false,
        })
        message.success('退出登录成功')
      } else {
        message.error('退出登录失败')
      }
    })
  }

  handleCrowllerClick = () => {
    axios.get('/api/getData').then((res) => {
      if (res.data?.data) {
        message.success('爬取成功')
      } else {
        message.error('爬取失败')
      }
    })
  }

  getOptions: () => echarts.EChartOption = () => {
    const { data } = this.state
    const courseNames: string[] = []
    const times: string[] = []
    const tempData: { [key:string]: number[] } = {}
    for (let i in data) {
      const item = data[i]
      times.push(moment(Number(i)).format('MM-DD HH:mm'))
      item.forEach(innerItem => {
        const { title, count } = innerItem
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title)
        }
        tempData[title] ? tempData[title].push(count) : (tempData[title] = [count])
      })
    }
    const result: LineData[] = []
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i],
      })
    }
    return {
      title: {
          text: '课程在线学习人数'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: courseNames,
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times,
      },
      yAxis: {
          type: 'value'
      },
      series: result,
      }
  }

  render() {
    const { isLogin, loaded } = this.state
    // loaded 防止页面抖动
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button
                type="primary"
                onClick={this.handleCrowllerClick}
              >
                爬取内容
              </Button>
              <Button
              type="danger"
              onClick={this.handleLogoutClick}
              >
                退出登录
              </Button>
            </div>
            <ReactEcharts option={this.getOptions()} />
          </div>
        )
      }
      return null
    }
    return <Redirect to="/login" />
  }
}

export default Home

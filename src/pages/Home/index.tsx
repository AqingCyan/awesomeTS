import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'
import './style.css'

interface State {
  isLogin: boolean
  loaded: boolean
}

// 可以传入两个范型分别指定props和state的类型
class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      loaded: false,
      isLogin: true,
    }
  }

  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        console.log('已登录')
        this.setState({
          isLogin: false,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { isLogin, loaded } = this.state
    // loaded 防止页面抖动
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <Button type="primary">爬取内容</Button>
            <Button type="default">展示内容</Button>
            <Button type="danger">退出登录</Button>
          </div>
        )
      }
      return null
    }
    return <Redirect to="/login" />
  }
}

export default Home

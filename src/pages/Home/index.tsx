import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, message } from 'antd'
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

  render() {
    const { isLogin, loaded } = this.state
    // loaded 防止页面抖动
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <Button type="primary">爬取内容</Button>
            <Button type="default">展示内容</Button>
            <Button
            type="danger"
            onClick={this.handleLogoutClick}
            >
              退出登录
            </Button>
          </div>
        )
      }
      return null
    }
    return <Redirect to="/login" />
  }
}

export default Home

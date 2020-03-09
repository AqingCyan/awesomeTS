import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import qs from 'qs'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './style.css'

interface FormFields {
  password: string
}

interface Props {
  form: WrappedFormUtils<FormFields>
}

class LoginForm extends Component<Props> {
  state = {
    isLogin: false,
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/login', qs.stringify({
          password: values.password,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }).then((res) => {
          if (res.data?.data) {
            this.setState({
              isLogin: true,
            })
          } else {
            message.error('登录失败')
          }
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isLogin } = this.state
    return (
      isLogin ?
      <Redirect to="/" /> :
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm)

export default WrappedLoginForm

import React, { Component } from 'react';
import {login, fetchCaptcha} from '../../api/index.js';
import {Button, Input, Message} from 'element-react';

export class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      name: '',
      captcha: '',
      key: ''
    }
    this.fetch = this.fetch.bind(this)
  }

  componentWillMount(){
    this.fetch()
  }

  fetch(){
    fetchCaptcha().then(res => {
      console.log('获取验证码', res)
      this.setState({
        captchaImg: res.data.img,
        key: res.data.key
      })
    })
  }

  handleChange (e) {
    if(e.target.value){
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  // 登录
  submit () {
    login(this.state.name, this.state.password, this.state.captcha, this.state.key).then(res => {
      console.log(res)
      if(res.data.status === 0){
        Message({
          message: res.data.msg,
          type: 'error'
        });
      } else {
        Message({
          message: '登录成功！',
          type: 'success'
        });
        this.props.history.push('/main')
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(res.data.data))
      }
    })
  }

  register(){
    this.props.history.push('/register')
  }

  render() {
    return (
      <div className="login">
        <h2 className="title">登录</h2>
        <Input prepend="用户名" placeholder="请输入用户名/邮箱" name="name" onInput={this.handleChange.bind(this)}/>
        <Input prepend="密码" placeholder="请输入密码" name="password" onInput={this.handleChange.bind(this)}/>
        <Input prepend="验证码"
          placeholder="请输入验证码"
          name="captcha"
          onInput={this.handleChange.bind(this)}
          append={<img src={this.state.captchaImg} alt="验证码" onClick={this.fetch} style={{height: '34px'}}/>}
        />
        <div className="t-c">
          <Button type="primary" onClick={this.submit.bind(this)}>登录</Button><br/>
          <Button type="text" onClick={this.register.bind(this)}>没有账号，去注册</Button>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import {register, fetchCaptcha} from '../../api/index.js';
import {Button, Input, Message} from 'element-react';

export class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      captcha: '',
      captchaImg: '',
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

  // 注册
  submit () {
    console.log(this.state)
    register(this.state.username, this.state.email, this.state.password, this.state.captcha, this.state.key).then(res => {
      console.log(res)
      if(res.data.status === 0){
        Message({
          message: res.data.msg,
          type: 'error'
        });
      } else {
        Message({
          message: '注册成功！',
          type: 'success'
        });
        this.login()
      }
    })
  }

  login(){
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="login">
        <h2 className="title">注册</h2>
        <Input prepend="用户名" placeholder="请输入用户名" name="username" onInput={this.handleChange.bind(this)}/>
        <Input prepend="邮箱" placeholder="请输入邮箱" name="email" onInput={this.handleChange.bind(this)}/>
        <Input prepend="密码" placeholder="请输入密码" name="password" onInput={this.handleChange.bind(this)}/>
        <Input prepend="验证码"
          placeholder="请输入验证码"
          name="captcha"
          onInput={this.handleChange.bind(this)}
          append={<img src={this.state.captchaImg} alt="验证码" onClick={this.fetch} style={{height: '34px'}}/>}
        />
        <div className="t-c">
          <Button type="primary" onClick={this.submit.bind(this)}>注册</Button><br/>
          <Button type="text" onClick={this.login.bind(this)}>已有账号，去登录</Button>
        </div>
      </div>
    );
  }
}
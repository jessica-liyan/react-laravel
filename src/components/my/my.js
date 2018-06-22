import React, { Component } from 'react';
import {Form, Input, Select} from 'element-react';

export class My extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        name: '',
        email: ''
      }
    }
  }

  componentWillMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  onSubmit(){
  }

  onChange(name){
    console.log(name)
  }

  render() {
    return (
      <div>
        <h2 className="title">个人中心</h2>
        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)} style={{width: '600px'}}>
          <Form.Item label="用户名">
            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
          </Form.Item>
          <Form.Item label="邮箱">
            <Select value={this.state.form.region} placeholder="请选择活动区域">
              <Select.Option label="区域一" value="shanghai"></Select.Option>
              <Select.Option label="区域二" value="beijing"></Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
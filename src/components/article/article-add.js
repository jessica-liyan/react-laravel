import React, { Component } from 'react';
import {Form, Input, Radio, Button, Tag, Upload, Message} from 'element-react';
import {addArticle} from '../../api/index';

export class ArticleAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        title: '',
        content: '',
        tag: [],
        classify: '',
        cover: '',
        author: ''
      },
      tags: [],
      inputValue: '',
      inputVisible: false,
      fileUrl: ''
    }
  }

  componentWillMount(){
    this.user = JSON.parse(localStorage.getItem('user'))
    this.setState({
      form: Object.assign({}, this.state.form, {author: this.user.name})
    })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, {[key]: value})
    })
    this.forceUpdate();
  }

  handleClose(index) {
    this.state.tags.splice(index, 1);
    this.forceUpdate();
  }
  
  showInput() {
    this.setState({ inputVisible: true }, () => {
      this.refs.saveTagInput.focus();
    });
  }

  onTagInputChange(value){
    this.setState({
      inputValue: value
    })
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleInputConfirm();
    }
  }
  
  handleInputConfirm() {
    let inputValue = this.state.inputValue;
  
    if (inputValue) {
      this.state.tags.push(inputValue);
    }
    
    this.setState({
      inputVisible: false,
      inputValue: ''
    })
  
    this.forceUpdate();
  }

  // 封面上传成功
  handleSucess(res, file, fileList) {
    this.setState({ fileUrl: URL.createObjectURL(file.raw) });
    console.log('success', res, file, fileList)
    if(res.status === 1){
      Message('封面上传成功！');
      this.setState({
        form: Object.assign({}, this.state.form, {cover: res.data.path})
      })
    }
  }
  
  // 封面照片判断
  beforeUpload(file) {
    console.log('file', file)
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt500 = file.size / 1024  < 500;
    if (!isJPG) {
      Message('上传头像图片只能是JPG或PNG格式!');
      return false 
    }
    if (!isLt500) {
      Message('上传头像图片大小不能超过 500kb!');
      return false 
    }
  }

  onSubmit(e){
    e.preventDefault();
    console.log('提交', this.state.form)
    this.setState({
      form: Object.assign({}, this.state.form, {tag: this.state.tags.join(',')})
    })
    addArticle(this.state.form).then(res => {
      console.log('res',res)
      if(res.data.status === 1){
        Message(res.data.msg)
        this.props.history.go(-1)
      }
    })
  }

  render() {
    return (
      <div>
        <h2 className="title">添加文章</h2>
        <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)} style={{width: '600px'}}>
          <Form.Item label="标题">
            <Input value={this.state.form.title} onChange={this.onChange.bind(this, 'title')}></Input>
          </Form.Item>
          <Form.Item label="内容">
            <Input value={this.state.form.content}
              type="textarea"
              autosize={{ minRows:4, maxRows:10}}
              onChange={this.onChange.bind(this, 'content')}
            ></Input>
          </Form.Item>
          <Form.Item label="标签">
            {
              this.state.tags.map((tag, index) => {
                return (
                  <Tag
                    key={Math.random()}
                    closable={true}
                    closeTransition={false}
                    onClose={this.handleClose.bind(this, index)}>{tag}</Tag>
                )
              })
            }
            {
              this.state.inputVisible ? (
                <Input
                  style={{width: '80px', height: '24px'}}
                  value={this.state.inputValue}
                  ref="saveTagInput"
                  size="mini"
                  onChange={this.onTagInputChange.bind(this)}
                  onBlur={this.handleInputConfirm.bind(this)}
                />
              ) : <Button style={{lineHeight: '22px', height: '24px', padding: '0 10px'}} size="small" onClick={this.showInput.bind(this)}>+ 添加</Button>
            }
          </Form.Item>
          <Form.Item label="分类">
            <Radio.Group value={this.state.form.classify} onChange={this.onChange.bind(this, 'classify')}>
              <Radio.Button value="前端" />
              <Radio.Button value="后端" />
              <Radio.Button value="产品" />
              <Radio.Button value="设计" />
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面">
            <Upload
              className="avatar-uploader"
              action="http://localhost/api/public/api/upload/file"
              name="files"
              showFileList={false}
              beforeUpload={file => this.beforeUpload(file)}
              onSuccess={(res, file, fileList) => this.handleSucess(res, file, fileList)}
            >
              { this.state.fileUrl ? <img src={this.state.fileUrl} width="100%" alt="图片"/> : <i className="el-icon-plus avatar-uploader-icon"></i> }
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" nativeType="submit">确定</Button>
            <Button>取消</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}





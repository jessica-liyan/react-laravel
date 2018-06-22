import React, { Component } from 'react';
import {getStorageUrl, fetchArticleDetail} from '../../api/index';

export class ArticleDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillMount(){
    fetchArticleDetail(this.props.match.params.id).then(res => {
      console.log('res详情', res)
      this.setState({
        data: res.data.data
      })
    })
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <h2 className="tit">{data.title}</h2>
        <div className="fs-14 c-9 t-c mb-20">
          <span className="mr-20">{data.author}</span>
          <span>{data.created_at}</span>
        </div>
        <div className="t-c mb-20">
          <img src={`${getStorageUrl()}${data.cover}`} alt="图片"/>
        </div>
        <p className="fs-14 c-3 lh-18 indent">{data.content}</p>
      </div>
    );
  }
}

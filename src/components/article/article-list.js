import React, { Component } from 'react';
import {Button} from 'element-react';
import {NavLink} from 'react-router-dom';
import {getStorageUrl, fetchArticle} from '../../api/index';

export class ArticleList extends Component {
  constructor(props){
    super(props)
    console.log(props.history)
    this.state = {
      list: []
    }
  }

  componentWillMount(){
    fetchArticle().then(res => {
      console.log(res)
      this.setState({
        list: res.data.data
      })
    })
  }

  add(){
    this.props.history.push(`${this.props.match.url}/add`)
  }

  render() {
    return (
      <div>
        <h2 className="title">文章列表</h2>
        <Button type="primary" onClick={this.add.bind(this)} className="mb-10">添加文章</Button>
        <ul className="grid four article-list">
          {
            this.state.list.map((item,index) => (
              <li key={index}>
                <NavLink to={`${this.props.match.url}/${item.uId}`}>
                  <p className="img"><img src={`${getStorageUrl()}${item.cover}`} alt="图片"/></p>
                  <div className="pd-10">
                    <p className="fs-16 c-3 oneline">{item.title}</p>
                    <div className="row w fs-14 c-9 mt-10">
                      <span className="col v-m t-l">{item.author}</span>
                      <span className="col v-m t-r">{item.created_at.substr(0,10)}</span>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}





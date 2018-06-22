import React, { Component } from 'react';
import {Button} from 'element-react';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom';
import {My} from '../my/my';
import {Home} from '../home/home';
import {Article} from '../article/article';

export class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }
  componentWillMount(){
    setTimeout(() => {
      this.setState({
        name: JSON.parse(localStorage.getItem('user')).name
      })
    }, 0)
  }

  // 用户注销，退出登录
  logout(){
    this.props.history.push('/login')
  }

  render() {
    let match = this.props.match
    return (
      <Router>
        <div>
          <div className="header">
            <div>
              <NavLink to={`${match.url}/home`} exact>首页</NavLink>
              <NavLink to={`${match.url}/article`} exact>发布文章</NavLink>
            </div>
            <div className="header-info">
              <NavLink to={`${match.url}/my`}>{this.state.name}</NavLink>
              <Button type="text" onClick={this.logout.bind(this)}>退出</Button>
            </div>
          </div>
          <div className="mid main">
            <Switch>
              <Route path={`${match.url}/home`} render={props => <Home {...props}/>}/>
              <Route path={`${match.url}/article`} render={props => <Article {...props}/>}/>
              <Route path={`${match.url}/my`} render={props => <My {...props}/>}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
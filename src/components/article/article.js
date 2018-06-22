import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ArticleList} from './article-list';
import {ArticleAdd} from './article-add';
import {ArticleDetail} from './article-detail';

export class Article extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path={`${this.props.match.url}`} exact render={props => <ArticleList {...props}/>}/>
            <Route path={`${this.props.match.url}/add`} exact render={props => <ArticleAdd {...props}/>}/>
            <Route path={`${this.props.match.url}/:id`} exact render={props => <ArticleDetail {...props}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}




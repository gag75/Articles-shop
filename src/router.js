import React, { Component} from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFound from './containers/NotFound'
import FormLogin from './containers/FormLogin'
import FormRegistration from './containers/FormRegistration'
import User from './containers/User'
import Home from './containers/Home'
import Admin from './containers/Admin'
import Article from './containers/Article'
import MyArticles from './containers/MyArticles'

import requireAuthentication from './containers/Authenticated'
import AuthenticatedAdmin from './containers/AuthenticatedAdmin'
import requireAuthenticationFalse from './containers/AuthenticatedFalse/'


export default class RouterApp extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                  <IndexRoute component={Home}/>
                  <Route path='/login' component={requireAuthenticationFalse(FormLogin)} />
                  <Route path='/registration' component={requireAuthenticationFalse(FormRegistration)} />
                  <Route path='/user' component={requireAuthentication(User)} />
                  <Route path='/admin' component={AuthenticatedAdmin(Admin)} />
                  <Route path='/user/myArticles' component={requireAuthentication(MyArticles)} />
                  <Route path='/article/:hash' component={Article} />
                </Route>
                <Route path='*' component={NotFound} />
            </Router>
        )
    }
}
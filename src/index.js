'use strict';
import 'babel-polyfill'
import style from './style'
import React, {Component} from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LoginHash from './containers/LoginHash'

const store = configureStore()

const appContainer = document.getElementById('app');
appContainer.className=style.app;

class App extends Component {
    componentWillMount() {
        injectTapEventPlugin();
    }
    render() {
        return (
            <Provider store={store}>
                <LoginHash>
                    <Router />
                </LoginHash>
            </Provider>
        )
    }
}

render(
    <App />,
    appContainer
)
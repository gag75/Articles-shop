import React, { Component } from 'react'
import AppComponent from '../../components/App'
import AppBar from '../AppBar'
import SideBar from '../SideBar'
import Dialog from '../Dialog'
import Snackbar from '../Snackbar'



export default class App extends Component {
    render() {
        return (
            <AppComponent>
              <AppBar/>
              <SideBar/>
              {this.props.children}
              <Dialog />
              <Snackbar />
            </AppComponent>
        )
    }
}


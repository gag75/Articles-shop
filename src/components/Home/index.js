import React, { Component } from 'react'
import style from './style.css'
/*import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';*/

export default class HomeComponent extends Component {
    render() {
        return (
            <section className={style.wrap}>
              {this.props.children} 
            </section>
        )
    }
}
import React, { Component } from 'react'
import style from './style.css'

export default class AppComponent extends Component {
    render() {
        return (
            <div className={style.wrapper}>
                { this.props.children }
            </div>
        )
    }
}
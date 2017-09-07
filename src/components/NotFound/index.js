import React, { Component } from 'react'
import { Link } from 'react-router'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class NotFound extends Component {
    render() {
        return (
            <section className={style.section}>
                <div className={style.status}>404 - Not Found</div>
                <div className={style.text}>Вернуться на главную?</div>
                <Link to='/'>
                    <MuiThemeProvider>
                        <RaisedButton label='Go' backgroundColor='#00bcd4' labelColor='#fff' />
                    </MuiThemeProvider>
                </Link>
            </section>
        )
    }
}
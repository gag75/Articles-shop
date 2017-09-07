import React, { PropTypes, Component } from 'react'
import style from './style.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class UserComponent extends Component {
    handleOpenDialog(name) {
        this.props.openDialogAction({name})
    }
    handleOpenDialogChangePass(e) {
        e.preventDefault()
        this.handleOpenDialog('FormChangePass');
    }
    handleOpenDialogChangeName(e) {
        e.preventDefault()
        this.handleOpenDialog('FormChangeName');
    }
    render() {
        return (
            <section className={style.section}>
                <div className={style.card}>
                    <MuiThemeProvider>
                        <Card>
                            <CardHeader
                                style={{paddingBottom:'0px', paddingLeft:'23px'}}
                                titleStyle={{fontSize:'20px',fontWeight:'bold'}}
                                title={this.props.name}
                            />
                            <CardText style={{paddingTop:'10px', paddingLeft:'23px', paddingBottom: '0'}}>
                                <p>
                                    <span className={style.span1}>ФИО:</span>
                                    <span className={style.span2}>{this.props.fullName}</span>
                                </p>
                                <p>
                                    <span className={style.span1}>Email:</span>
                                    <span className={style.span2}>{this.props.email}</span>
                                </p>
                                <p>
                                    <span className={style.span1}>Статей:</span>
                                    <span className={style.span2}>4</span>
                                </p>
                            </CardText>
                            <CardActions>
                                <FlatButton labelStyle={{color: '#00bcd4'}} onClick={::this.handleOpenDialogChangePass} label='Изменить пароль' />
                                <FlatButton labelStyle={{color: '#00bcd4'}} onClick={::this.handleOpenDialogChangeName} label='Изменить логин' />
                            </CardActions>
                        </Card>
                    </MuiThemeProvider>
                </div>
                {this.props.children}
            </section>
        )
    }
}

UserComponent.propTypes = {
    openDialogAction: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}

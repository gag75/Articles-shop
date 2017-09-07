import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormLoginComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorName == '' && this.props.errorPass == '') {
            let name = e.target.elements[0].value;
            let pass = e.target.elements[1].value;
            let userLogin = this.props.userLoginAction;
            this.props.loginRequestAction({name,pass,userLogin});
        }
    }
    handleChangeName(textField) {
        let name = textField.target.value;
        this.props.validationNameAction({name});
    }
    handleChangePass(textField) {
        let pass = textField.target.value;
        this.props.validationPassAction({pass});
    }
    handleOpenResetPass(e) {
        e.preventDefault();
        this.props.openDialogAction({name:'FormResetPassEmail'});
    }
    render() {
        let template;
        if (this.props.request == false) {
            template = (
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Логин'
                        defaultValue={this.props.name}
                        errorText={this.props.errorName}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangeName}
                    /><br/>
                    <TextField
                        type='password'
                        hintText='Пароль'
                        errorText={this.props.errorPass}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangePass}
                    /><br/>
                    <a onClick = {::this.handleOpenResetPass} href='/resetpass' className={style.a}>Восстановление пароля</a>
                    <RaisedButton type='submit' fullWidth={true} label='Войти' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
                </form>
            )
        } else {
            template = (
                <CircularProgress style={{display: 'block', margin: '0 auto'}} color='#00bcd4' />
            )
        }
        return (
            <MuiThemeProvider>
                {template}
            </MuiThemeProvider>
        )
    }
}

FormLoginComponent.propTypes = {
    loginRequestAction: PropTypes.func.isRequired,
    validationNameAction: PropTypes.func.isRequired,
    validationPassAction: PropTypes.func.isRequired,
    closeDialogAction: PropTypes.func.isRequired,
    openDialogAction: PropTypes.func.isRequired,
    userLoginAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    errorName: PropTypes.string.isRequired,
    errorPass: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
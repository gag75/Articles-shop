import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormRegistrationComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorName == '' && this.props.errorPass == '' && this.props.errorEmail == '') {
            let name = e.target.elements[0].value;
            let fullName = e.target.elements[1].value;
            let pass = e.target.elements[2].value;
            let email = e.target.elements[3].value;
            let userLogin = this.props.userLoginAction;
            let closeDialog = this.props.closeDialogAction;
            this.props.registrationRequestAction({name,fullName,pass,email,userLogin,closeDialog});
        }
    }
    handleChangeName(textField) {
        let name = textField.target.value;
        this.props.existenceNameAction({name});
    }
    handleChangeFullName(textField) {
        let fullName = textField.target.value;
        this.props.validationFullNameAction({fullName});
    }
    handleChangePass(textField) {
        let pass = textField.target.value;
        this.props.validationPassAction({pass});
    }
    handleChangeEmail(textField) {
        let email = textField.target.value;
        this.props.existenceEmailAction({email});
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
                        hintText='ФИО'
                        defaultValue={this.props.fullName}
                        errorText={this.props.errorFullName}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangeFullName}
                    /><br/>
                    <TextField
                        type='password'
                        hintText='Пароль'
                        errorText={this.props.errorPass}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangePass}
                    /><br/>
                    <TextField
                        hintText='Email'
                        defaultValue={this.props.email}
                        errorText={this.props.errorEmail}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangeEmail}
                    /><br/>
                    <RaisedButton type='submit' fullWidth={true} label='Регистрация' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
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

FormRegistrationComponent.propTypes = {
    registrationRequestAction: PropTypes.func.isRequired,
    existenceNameAction: PropTypes.func.isRequired,
    validationFullNameAction: PropTypes.func.isRequired,
    validationPassAction: PropTypes.func.isRequired,
    existenceEmailAction: PropTypes.func.isRequired,
    userLoginAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    errorName: PropTypes.string.isRequired,
    errorPass: PropTypes.string.isRequired,
    errorEmail: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
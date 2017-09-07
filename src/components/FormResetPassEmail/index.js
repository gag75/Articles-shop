import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormResetPassEmailComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorEmail == '') {
            let email = e.target.elements[0].value;
            let openDialog = this.props.openDialogAction;
            this.props.emailRequestAction({email,openDialog});
        }
    }
    handleChangeEmail(textField) {
        let email = textField.target.value;
        this.props.validationEmailAction({email});
    }
    render() {
        let template;
        if (this.props.request == false) {
            template = (
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    <p className={style.text}>Введите email</p>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Email'
                        defaultValue={this.props.email}
                        errorText={this.props.errorEmail}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangeEmail}
                    />
                    <RaisedButton type='submit' fullWidth={true} label='Далее' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
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

FormResetPassEmailComponent.propTypes = {
    emailRequestAction: PropTypes.func.isRequired,
    validationEmailAction: PropTypes.func.isRequired,
    openDialogAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    errorEmail: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormResetPassNewComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorPass == '') {
            let pass = e.target.elements[0].value;
            let hash = this.props.hash;
            let closeDialog = this.props.closeDialogAction;
            this.props.passRequestAction({pass,hash,closeDialog});
        }
    }
    handleChangePass(textField) {
        let pass = textField.target.value;
        this.props.validationPassAction({pass});
    }
    render() {
        let template;
        if (this.props.request == false) {
            template = (
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    <p className={style.text}>Введите новый пароль</p>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Пароль'
                        errorText={this.props.errorPass}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangePass}
                    />
                    <RaisedButton type='submit' fullWidth={true} label='Изменить Пароль' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
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

FormResetPassNewComponent.propTypes = {
    passRequestAction: PropTypes.func.isRequired,
    validationPassAction: PropTypes.func.isRequired,
    closeDialogAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    hash: PropTypes.string.isRequired,
    errorPass: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
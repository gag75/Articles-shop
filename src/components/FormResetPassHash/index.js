import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormResetPassHashComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorHash == '') {
            let hash = e.target.elements[0].value;
            let openDialog = this.props.openDialogAction;
            let setHash = this.props.setHashAction;
            this.props.hashRequestAction({hash,openDialog,setHash});
        }
    }
    handleChangeHash(textField) {
        let hash = textField.target.value;
        this.props.validationHashAction({hash});
    }
    render() {
        let template;
        if (this.props.request == false) {
            template = (
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    <p className={style.text}>Введите код который был отправлен на email</p>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Hash'
                        defaultValue={this.props.hash}
                        errorText={this.props.errorHash}
                        underlineStyle={{color: '#00bcd4'}}
                        onChange={::this.handleChangeHash}
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

FormResetPassHashComponent.propTypes = {
    hashRequestAction: PropTypes.func.isRequired,
    validationHashAction: PropTypes.func.isRequired,
    openDialogAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    hash: PropTypes.string.isRequired,
    errorHash: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
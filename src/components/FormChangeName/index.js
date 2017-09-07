import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class FormChangeNameComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.errorName == '') {
            let name = e.target.elements[0].value;
            let closeDialog = this.props.closeDialogAction;
            let hash = this.props.hash;
            let newName = this.props.newNameAction
            this.props.nameRequestAction({name,hash,closeDialog,newName});
        }
    }
    handleChangeName(textField) {
        let name = textField.target.value;
        this.props.existenceNameAction({name});
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
                    />
                    <RaisedButton type='submit' fullWidth={true} label='ИЗМЕНИТЬ ЛОГИН' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
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

FormChangeNameComponent.propTypes = {
    nameRequestAction: PropTypes.func.isRequired,
    existenceNameAction: PropTypes.func.isRequired,
    closeDialogAction: PropTypes.func.isRequired,
    newNameAction: PropTypes.func.isRequired,
    request: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    errorName: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}
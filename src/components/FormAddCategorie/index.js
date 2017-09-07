import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css'


export default class FormAddCategorieComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
            let hash = this.props.userHash;
            let categorieName = e.target.elements[0].value;
            this.props.addCategorieRequestAction({categorieName,hash,initCategories:this.props.initCategoriesAction});
    }
    render() {
        return (
            <MuiThemeProvider>
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Имя новой категории'
                        floatingLabelText='Имя новой категории'
                        underlineStyle={{color: '#00bcd4'}}
                    />
                    <RaisedButton type='submit' fullWidth={true} label='Добавить' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
                </form>
            </MuiThemeProvider>
        )
    }
}
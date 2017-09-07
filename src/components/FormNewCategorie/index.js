import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css'


export default class FormNewCategorieComponent extends Component {
    handleSubmit(e) {
        e.preventDefault();
            let hash = this.props.userHash;
            let categorie = e.target.elements[0].value;
            this.props.newCategorieRequestAction({
                categorie:{
                    id:this.props.categorie.id,
                    categorie: categorie
                },
                hash,
                initCategories:this.props.initCategoriesAction
            });
    }
    render() {
        return (
            <MuiThemeProvider>
                <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
                    {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
                    <TextField
                        autoFocus={true}
                        hintText='Категория'
                        underlineStyle={{color: '#00bcd4'}}
                        defaultValue={this.props.categorie.categories}
                    />
                    <RaisedButton type='submit' fullWidth={true} label='Изменить' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
                </form>
            </MuiThemeProvider>
        )
    }
}
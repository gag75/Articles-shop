import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import style from './style.css'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/*import { Link } from 'react-router'*/




export default class AdminComponent extends Component {
  
  state = {
    value: -1
  }

  handleSubmit(e) {
        e.preventDefault();
        let title =e.target.elements[0].value;
        let text = e.target.elements[1].value;
        let some_text = e.target.elements[4].value;
        let timeLife = e.target.elements[5].value;
        let price = e.target.elements[6].value;
        let sale =  e.target.elements[7].value;
        let img =  e.target.elements[8].value;

        const eventType=e.target;
        let callback = function(){
            eventType.elements[0].value='';
            eventType.elements[1].value='';
            eventType.elements[2].value='';
            eventType.elements[3].value='';
            eventType.elements[4].value='';
            eventType.elements[5].value='';
            eventType.elements[6].value='';
            eventType.elements[7].value='0';
            eventType.elements[8].value='';
        }
        this.props.FormNewArticleActions.addRequest({hash:this.props.user.hash,some_text,title,text,timeLife,price,sale,categories:this.state.value,img,callback});
  }

  handleChangeSelect(event, index, value){
    this.setState({value});
  }

  handleClickChangeCategorie(value){
    this.props.initFormNewCategorie({categorie:value});
    this.props.openDialogAction({name:'FormNewCategorie'});
  }

  handleClickAddCategorie(){
    this.props.openDialogAction({name:'FormAddCategorie'});
  }

  handleClickRemoveCategorie(value){
    let hash = this.props.user.hash;
    let idRemoveCategorie = value.id;
    this.props.removeCategorieRequestAction({
      initCategories:this.props.initCategoriesAction,
      hash,
      id: idRemoveCategorie
    });
  }

  handleClickConfirmApplication(value){
    this.props.confirmApplicationAction({id:value.id, hash:this.props.user.hash, applications: this.props.applications.applications});
  }

  handleClickRejectApplication(value){
    this.props.rejectApplicationAction({id:value.id, hash:this.props.user.hash, applications: this.props.applications.applications});
  }

  
  
  render() {
    function disableWeekends(date) {
      var curentDate=new Date();
      return date<= curentDate ;  
    }
    let categories = this.props.categories;
    let applications = this.props.applications.applications;
    let templateSelectField = categories.map((value,index) => {
        if(value.categories=='all') return;
        return(
          <MenuItem key={value.id+index} value={value.id} primaryText={value.categories} />
        )
    });
    let templateAdd=(
        <form method='POST' action='/#' onSubmit = {::this.handleSubmit}>
            {this.props.error ? <p className={style.error}>{this.props.error}</p> : ''}
            <TextField
              fullWidth={true}
              hintText='Заголовок статьи'
              floatingLabelText='Заголовок статьи'
              underlineStyle={{color: '#00bcd4'}}
            /><br />
            <TextField
              fullWidth={true}
              floatingLabelText='Текст статьи'
              hintText='Текст статьи'
              multiLine={true}
              underlineStyle={{color: '#00bcd4'}}
              rows={2}
            /><br />
            <TextField
              fullWidth={true}
              floatingLabelText='Аннотация'
              hintText='Аннотация'
              multiLine={true}
              underlineStyle={{color: '#00bcd4'}}
              rows={2}
            /><br />
            <SelectField
              value={this.state.value}
              onChange={::this.handleChangeSelect}
              floatingLabelText='Категория статьи'
            >
            {templateSelectField}
            </SelectField><br /><br />
            <DatePicker 
              hintText='Срок истечения' 
              shouldDisableDate={disableWeekends} 
            />
            <TextField
              type='number'
              min='1'
              floatingLabelText='Цена статьи ($)'
              hintText='Цена'
              underlineStyle={{color: '#00bcd4'}}
            /><br />
            <TextField
              floatingLabelText='Скидка'
              type='number'
              min='0'
              max='50'
              defaultValue='0'
              hintText='скидка'
              underlineStyle={{color: '#00bcd4'}}
            /><br /><br /><br/>
            <input type='file' className={style.file}/><br/><br/>
            <RaisedButton type='submit' label='Добавить Статью' style={{marginTop:20}} backgroundColor='#00bcd4' labelColor='#fff' />
        </form>
    )
    let templateCategories = categories.map((value, index) => {
                return (
                    <tr key={value.id+index+(new Date()).getTime()} className={style.tr}>
                        <td className={style.td}>
                            {value.categories}
                        </td>
                        <td className={style.td}>
                            <FlatButton onClick={this.handleClickChangeCategorie.bind(this,value)} label='Изменить' primary={true} />
                        </td>
                        <td className={style.td}>
                            <FlatButton onClick={this.handleClickRemoveCategorie.bind(this,value)} label='Удалить' primary={true} />
                        </td>
                    </tr>
                )
            });

    console.log(applications);
    let templateApplications = applications.map((value, index) => {
                return (
                    <tr key={index+value.url+(new Date()).getTime()} className={style.tr}>
                        <td className={style.td}>
                            {value.user}
                        </td>
                        <td className={style.td}>
                            {value.title}
                        </td>
                        <td className={style.td}>
                            {value.categories}
                        </td>
                        <td className={style.td}>
                            {value.price-(value.price*value.sale)/100}
                        </td>
                        <td className={style.td}>
                            <FlatButton  onClick={this.handleClickConfirmApplication.bind(this,value)} label='Подтвердить' primary={true} />
                        </td>
                        <td className={style.td}>
                            <FlatButton  onClick={this.handleClickRejectApplication.bind(this,value)} label='Отколнить' primary={true} />
                        </td>
                    </tr>
                )
            });
    return (
    <div className={style.cont}>
      <MuiThemeProvider> 
        <Tabs>
          <Tab label='Заявки' value='a' >
            <table className={style.table}>
              {templateApplications.length>0 ?
                    <thead>
                        <tr>
                            <th className={style.th}>
                                Имя пользователя
                            </th>
                            <th className={style.th}>
                                Название статьи
                            </th>
                            <th className={style.th}>
                                Категория статьи
                            </th>
                            <th className={style.th}>
                                Цена статьи
                            </th>
                        </tr>
                    </thead> : ''
                }
                    <tbody>
                        {templateApplications.length>0 ? templateApplications : 'заказов нет !'}
                    </tbody>
            </table>
          </Tab>
          <Tab label='Добавить статью' value='b'>
              {templateAdd}
          </Tab>
          <Tab label='Категории' value='c'>
             <table className={style.table}>
                    <tbody>
                        {templateCategories}
                    </tbody>
                </table>
                 <FlatButton onClick={::this.handleClickAddCategorie} style={{marginTop:'20px'}} label='Добавить категорию' primary={true} />
          </Tab>
        </Tabs>
       </MuiThemeProvider>
     </div>
    );
  }
}


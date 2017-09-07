import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import style from './style.css'

import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class AppBarComponent extends Component {
    handleExit(e) {
        e.preventDefault()
        this.props.userLogoutAction();
    }
    render() {
      let template;
      const typeUser = this.props.typeUser;

      if (typeUser == 1) {
            template = (
            <MenuItem style={{backgroundColor:'#fff'}}>
              <Link to='/user'><MenuItem>{this.props.name}</MenuItem></Link> 
              <Link to='/user/MyArticles'><MenuItem>Статьи</MenuItem></Link> 
              <Link to='/logout' onClick={::this.handleExit}><MenuItem>Выход</MenuItem></Link>
            </MenuItem>
          )
      } else if (typeUser == 2) {
          template = (
            <MenuItem style={{backgroundColor:'#fff'}}>
              <Link to='/user'><MenuItem>{this.props.name}</MenuItem></Link>
              <Link to='/admin'><MenuItem>Админ</MenuItem></Link>
              <Link to='/logout' onClick={::this.handleExit}><MenuItem>Выход</MenuItem></Link>
            </MenuItem>
          )
      } else {
          template = (
            <MenuItem style={{backgroundColor:'#fff'}}>
              <Link to='/login'><MenuItem>Войти</MenuItem></Link> 
              <Link to='/registration'><MenuItem>Регистрация</MenuItem></Link>
            </MenuItem>
          )
        }

        const rightButton=(
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          {template}
          </IconMenu>
        )
        var date = new Date();
        var optionsDate = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        let Mytitle=(
          <div>
            <h1 className={style.header}>
              ArcticlesShop
              <br/>
            </h1>
            <p className={style.date}>{date.toLocaleString('ru', optionsDate)}</p>
          </div>
        );
        return (
        <div className={style.wrap}>
          <MuiThemeProvider>
            <AppBar
              title={Mytitle}
              titleStyle={{lineHeight:'20px'}}
              style={{textAlign:'center'}}
              iconElementRight={rightButton}
            />
          </MuiThemeProvider>
        </div>
    );
    }
}


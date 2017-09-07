import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardText, CardMedia, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs'
import style from './style.css'

export default class MyArticlesComponent extends Component {
    handleClickBtnMore(e) {
        e.preventDefault();
        let activeCategorie = this.props.activeCategorie;
        let nextId=this.props.nextId;
        if (activeCategorie=='all'){
            activeCategorie=null;
        }
        this.props.nextListAction({hash:this.props.user.hash, state: this.props.state, categorie:activeCategorie, nextId});
    }
    handleClickTab(tab) {
        let activeCategorie = this.props.activeCategorie;
        if (activeCategorie=='all'){
            activeCategorie=null;
        }
        this.props.initCategoriesAction({hash:this.props.user.hash, state: tab.props.value});
        this.props.initListAction({hash:this.props.user.hash, state: tab.props.value});
    }
    render() {
        let articles = this.props.articles;
        let nextId = this.props.nextId;
        /*let activeCategorie = this.props.activeCategorie;*/
        let state = this.props.state;
        let template;
        var optionsDate = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        if (articles.length > 0 && state!=1) {
            template = articles.map((value, index) => {
                /*let imgSrc=`http://lorempixel.com/600/337/${value.img}`;*/
                return (
                    <MuiThemeProvider key={value.url + index}>
                        <div className={style.card}> 
                          <Card>
                            <CardMedia
                              overlay={
                                (state==2) ?
                                <CardTitle 
                                    subtitleStyle={{color:'white'}} 
                                    titleStyle={{color:'white'}} 
                                    style={{background:'rgba(0,188,212,0.8)'}}  
                                    title={value.categories} 
                                    subtitle={'до: '+value.time_life.toLocaleString('ru', optionsDate)}/>
                                :
                                <CardTitle 
                                    subtitleStyle={{color:'white'}} 
                                    titleStyle={{color:'white'}} 
                                    style={{background:'rgba(255, 255, 0, 0.7)'}}  
                                    title={value.categories} 
                                    subtitle={'до: '+value.time_life.toLocaleString('ru', optionsDate)}/>
                                }
                            >
                              <img src={'/images/'+value.img} width='300px' height='200px'/>
                            </CardMedia>
                            <CardTitle title={value.title}/>
                            <CardText>
                                {value.someText}
                            </CardText>
                            {(state==2) ?
                                <CardActions>
                                  <Link to={'/article/'+value.url} style={{textDecoration:'none'}}><FlatButton label='Читать' /></Link>
                                </CardActions>
                                : ''
                            }
                          </Card>
                        </div>
                  </MuiThemeProvider>
                )
            });
        } else {
            template = (
                <div>
                    Статей нет !
                </div>
            )
        }
        return (
            <div className={style.cont}>
                <MuiThemeProvider>
                <Tabs style={{width:'100%'}} contentContainerClassName={style.wrap} >
                    <Tab label='Купленные' value='2' onActive={::this.handleClickTab}> 
                        { template }
                        {
                            nextId != '-1'
                            ?
                            <FlatButton className={style.btnMore} onClick={::this.handleClickBtnMore} label='Еще Статей' primary={true} />
                            :
                            ''
                        }
                    </Tab>
                    <Tab label='В ожидании' value='3' onActive={::this.handleClickTab}>
                      {template }
                      {
                        nextId != '-1'
                        ?
                        <FlatButton className={style.btnMore} onClick={::this.handleClickBtnMore} label='Еще Статей' primary={true} />
                        :
                        ''
                    }
                    </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        )
    }
}








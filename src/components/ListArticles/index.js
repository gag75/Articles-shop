import React, {  Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'
import style from './style.css'

export default class ListArticles extends Component {
    handleClick(e) {
        e.preventDefault();
        let activeCategorie = this.props.activeCategorie;
        let sort = this.props.sort;
        let nextId=this.props.nextId;
        let nextDate=this.props.nextDate;
        let nextPrice=this.props.nextPrice;
        if (activeCategorie=='all'){
            activeCategorie=null;
        }
        this.props.nextListAction({hash:this.props.user.hash,categorie:activeCategorie, sort, nextId, nextDate, nextPrice});
    }
    handleClickBuy(value) {
        if(this.props.user.type==0){
            this.props.routingToAction({method: 'replace', url: '/login'});
        }else{
            this.props.buyArticleAction({hash:this.props.user.hash,idArticle: value.id, articles: this.props.articles});
            /*this.props.initListAction({hash:this.props.user.hash,categorie:this.props.activeCategorie});*/
        }
    }
    handleChangeDropDown(event, index, sort){
        this.props.sortSelectAction({sort});
        this.props.initListAction({hash:this.props.user.hash, sort, categorie:this.props.activeCategorie});
    }
    render() {
        let articles = [];
        let template;
        let nextId = this.props.nextId;
        for (let article in this.props.articles) {
            articles.push(this.props.articles[article]);
        }
        if (articles.length > 0) {
            template = articles.map(value => {
                /*let imgSrc=`http://lorempixel.com/600/337/${value.categoriesId}`;*/
                let templateBtnUser;
                let styleCardTitle = {};
                if(value.buy==0){
                    templateBtnUser = (<FlatButton label='Купить' onClick={this.handleClickBuy.bind(this,value)}/>)
                }else if (value.buy==1){
                    styleCardTitle={background:'rgba(0,188,212,0.8)'}; 
                    templateBtnUser = (<Link to={'/article/'+value.url}> <FlatButton label='Читать' /> </Link>)
                }else if (value.buy==2){
                    styleCardTitle={background:'rgba(255, 255, 0, 0.7)'}; 
                    templateBtnUser = (<Link to={'/article/'+value.url}> <FlatButton label='Статья заказана' /> </Link>)
                }
                if(this.props.user.type==0){
                    styleCardTitle= {};
                    templateBtnUser = (<FlatButton label='Купить' onClick={this.handleClickBuy.bind(this,value)}/>)
                }
                return (
                          <Card  className={style.card} key={value.url+(new Date()).getTime()}>
                            <Link to={'/article/'+value.url} key={value.url+(new Date()).getTime()} style={{textDecoration:'none'}}>
                                <CardMedia
                                    overlay={
                                        <CardTitle 
                                            subtitleStyle={{color:'white'}} 
                                            titleStyle={{color:'white'}} 
                                            style={styleCardTitle}  
                                            title={value.categories} 
                                            subtitle={'до: '+value.time_life}
                                        />}
                                >
                                    <img src={'/images/'+value.img} width='300px' height='200px'/>
                                </CardMedia>
                                <CardTitle title={value.title} style={{paddingBottom:'0px'}} subtitle={(value.sale) ? 'Скидка ('+value.sale+'%)' : 'Скидка(нет)'}/>
                                <div className={style.price}>
                                  { value.sale>0 ? <span className={style.discount}>{value.price + '$'}</span> : ''}
                                  {value.price-(value.price*value.sale)/100+'$'}
                                </div>
                            </Link>
                            <CardActions>
                              { (this.props.user.type==2) ?
                                    <div>

                                    </div>
                                    : <div>{templateBtnUser}</div>
                              }
                            </CardActions>
                          </Card>
                )
            });
            if(!template.length){
                template = (
                <div>
                    Статей нет !
                </div>
                )
            }
        } else {
            template = (
                <div>
                    Статей нет !
                </div>
            )
        }
        return (
            <MuiThemeProvider>
            <div className={style.cont}>
                <MuiThemeProvider>
                    <DropDownMenu
                        style={{margin:'20px 0', width:'100%'}}
                        autoWidth={true}
                        onChange={::this.handleChangeDropDown}
                        value={this.props.sort}
                    >
                        <MenuItem value={0} primaryText='Дата по убыванию' />
                        <MenuItem value={1} primaryText='Дата по возрастанию' />
                        <MenuItem value={2} primaryText='Цена по возрастанию' />
                        <MenuItem value={3} primaryText='Цена по убыванию' />
                    </DropDownMenu>
                </MuiThemeProvider>
                {template}
                {
                    nextId != '-1'
                    ?
                    <FlatButton className={style.btnMore} onClick={::this.handleClick} label='Еще Статей' primary={true} />
                    :
                    ''
                }
            </div>
            </MuiThemeProvider>
        )
    }
}

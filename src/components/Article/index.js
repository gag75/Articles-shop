import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import style from './style.css'

export default class ArticleComponent extends Component {
    handleClickBuy(){
        this.props.buyArticleAction({hash:this.props.user.hash, idArticle: this.props.article.article.id});
    }

    render() {
        let article = this.props.article.article;
        let styleCardTitle = {};
        if(article.text==undefined && article.buy==true){
          styleCardTitle={background:'rgba(255, 255, 0, 0.8)'}; 
        }else if(article.text){
          styleCardTitle={background:'rgba(0,188,212,0.8)'}; 
        }
        return (
          <div className={style.wrap}> 
          <MuiThemeProvider>
            <Card className={style.card}>
              <CardHeader
                subtitle={article.categories}
                className ={style.cardHeaderFontSize}
              />
              <CardMedia
                overlay={
                  <CardTitle 
                    title={article.title} 
                    subtitleStyle={{color:'white'}} 
                    titleStyle={{color:'white'}} 
                    style={styleCardTitle}  
                    subtitle={'до: '+article.time_life}
                    />}
              >
                <img height='500px' src={'/images/'+article.img} />
               </CardMedia>
               <CardTitle title={article.title} style={{paddingBottom:'0px'}}/>
                <CardText style={{fontSize:'16px'}}>
                  {(article.text==undefined) ? article.some_text : article.text}
                </CardText>
                {(!article.buy) ?
                  <div>
                    <CardTitle style={{paddingBottom:'0px'}} subtitle={(article.sale) ? 'Скидка ('+article.sale+'%)' : 'Скидка(нет)'}/>
                    <div className={style.price}>
                      { article.sale>0 ? <span className={style.discount}>{article.price + '$'}</span> : ''}
                      {article.price-(article.price*article.sale)/100+'$'}
                    </div>
                    <CardActions>
                      {(this.props.user.type!=2) ? <FlatButton onClick={::this.handleClickBuy}label='Купить'/> : ''}
                    </CardActions>
                  </div>
                  :''
                }
              </Card>
            </MuiThemeProvider>
            </div> 
        )
    }
}
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ArticleComponent from '../../components/Article'
import * as DialogActions from '../../actions/DialogActions'
import * as ArticleActions from '../../actions/ArticleActions'
import * as BuyArticleActions from '../../actions/BuyArticleActions'


export class Article extends Component {
  componentWillMount() {
    let hashUrl = this.props.params.hash;
    let hashUser = this.props.user.hash;
    this.props.articleActions.initArticle({url:hashUrl, hashUser:hashUser });
  }
  componentWillUnmount() {
     this.props.articleActions.deInitArticle();
  }
  render() {
        const {buyArticle} =this.props.buyArticleActions;
        const {initArticle} =this.props.articleActions;
        return (
            <ArticleComponent
              user = {this.props.user}
              article={this.props.article}
              buyArticleAction = {buyArticle}
              initArticleAction = {initArticle}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        article : state.article,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(DialogActions, dispatch),
        articleActions: bindActionCreators(ArticleActions, dispatch),
        buyArticleActions: bindActionCreators(BuyArticleActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

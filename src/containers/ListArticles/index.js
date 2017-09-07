import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ListArticlesComponent from '../../components/ListArticles'
import * as DialogActions from '../../actions/DialogActions'
import * as ListArticlesActions from '../../actions/ListArticlesActions'
import * as RoutingActions from '../../actions/RoutingActions'
import * as BuyArticleActions from '../../actions/BuyArticleActions'

export class ListArticles extends Component {
    componentWillMount(){
        this.props.listArticlesActions.initList({hash: this.props.user.hash, categorie: this.props.categories.activeCategorie});
    }


    render() {
        //const { openDialog } = this.props.dialogActions
        const { listArticles } = this.props;    
        const {categories} = this.props;
        const { nextList } = this.props.listArticlesActions;
        const {sortSelect} = this.props.listArticlesActions;
        const {initList} = this.props.listArticlesActions;
        const {routing} = this.props.routingActions
        const {buyArticle} = this.props.buyArticleActions
        /*nextListAction = {nextList} в ретурн экшн для подзагрузки статей*/
        return (
            <ListArticlesComponent
                user = {this.props.user}
                articles = {listArticles.articles}
                activeCategorie={categories.activeCategorie}
                sort={listArticles.sort}
                nextId={listArticles.nextId}
                nextDate={listArticles.nextDate}
                nextPrice={listArticles.nextPrice}
                nextListAction = {nextList}
                sortSelectAction = {sortSelect}
                initListAction = {initList}
                routingToAction = {routing}
                buyArticleAction = {buyArticle}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        categories : state.categories,
        user : state.user,
        listArticles : state.listArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(DialogActions, dispatch),
        listArticlesActions: bindActionCreators(ListArticlesActions, dispatch),
        routingActions: bindActionCreators(RoutingActions, dispatch),
        buyArticleActions:  bindActionCreators(BuyArticleActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles)
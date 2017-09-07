import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MyArticlesComponent from '../../components/MyArticles'
import * as ListArticlesActions from '../../actions/ListArticlesActions'
import * as CategoriesAction from '../../actions/CategoriesAction'


export class MyArticles extends Component {
    componentWillUnmount(){
       this.props.categoriesAction.initCategories({hash: this.props.user.hash, state: 1});
    }
    componentWillMount() {
        this.props.listArticlesActions.initList({hash: this.props.user.hash, state: 2});
        this.props.categoriesAction.initCategories({hash: this.props.user.hash, state: 2});
    }
    render() {
        const { user } = this.props;  
        const { listArticles } = this.props;
        const { initList } = this.props.listArticlesActions;  
        const { nextList } = this.props.listArticlesActions;
        const { initCategories } = this.props.categoriesAction;

        /*const {categories} = this.props*/
        /*const { nextArticles } = this.props.myArticlesActions*/
        return (
            /* nextArticlesAction = {nextArticles} в ретурн*/
            <MyArticlesComponent
                user = {user}
                userHash = {this.props.user.hash}
                articles = {listArticles.articles}
                nextId = {listArticles.nextId}
                initListAction = {initList}
                nextListAction = {nextList}
                initCategoriesAction = {initCategories}
                state = {listArticles.state}//state для статей, 1 -все статьи по умолч , 2-купленные, 3 - статьи в ожидании

            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        categories : state.categories,
        listArticles : state.listArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        listArticlesActions: bindActionCreators(ListArticlesActions, dispatch),
        categoriesAction: bindActionCreators(CategoriesAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArticles)
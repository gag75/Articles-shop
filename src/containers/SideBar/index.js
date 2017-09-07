import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SideBarComponent from '../../components/SideBar'
import * as CategoriesAction from '../../actions/CategoriesAction'
import * as ListArticlesActions from '../../actions/ListArticlesActions'

export class SideBar extends Component {
    componentWillMount(){
      this.props.categoriesAction.initCategories({});
    }
    render() {
        const { listArticles } = this.props;
        const { categories } = this.props;
        const { selectActive} = this.props.categoriesAction;
        const {initList} = this.props.listArticlesActions;
        const {user} = this.props;
        return (
            <SideBarComponent
              user = {user}
              categories={categories.categories}
              selectActiveActions={selectActive}
              activeCategorie={categories.activeCategorie}
              initListAction = {initList}
              sort = {listArticles.sort}
              state = {listArticles.state}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
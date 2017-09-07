import React, { Component } from 'react'
import FormNewCategorieComponent from '../../components/FormNewCategorie'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormNewCategorieActions from '../../actions/FormNewCategorieActions'
import * as CategoriesAction from '../../actions/CategoriesAction'

export class FormNewCategorie extends Component {
    componentWillUnmount() {
        this.props.formNewCategorieActions.deinitForm();
    }
    render() {
        const {formNewCategorie} = this.props
        const {formNewCategorieActions} = this.props
        const {user} = this.props
        const { initCategories} = this.props.categoriesAction;

        return (
            <FormNewCategorieComponent
                error={formNewCategorie.error}
                categorie={formNewCategorie.categorie}
                newCategorieRequestAction = {formNewCategorieActions.newCategorieRequest}
                userHash = {user.hash}
                initCategoriesAction = {initCategories}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        formNewCategorie : state.formNewCategorie
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formNewCategorieActions: bindActionCreators(FormNewCategorieActions, dispatch),
        categoriesAction: bindActionCreators(CategoriesAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewCategorie)
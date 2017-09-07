import React, { Component } from 'react'
import FormAddCategorieComponent from '../../components/FormAddCategorie'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormAddCategorieActions from '../../actions/FormAddCategorieActions'
import * as CategoriesAction from '../../actions/CategoriesAction'

export class FormAddCategorie extends Component {
    componentWillUnmount() {
        this.props.formAddCategorieActions.deinitForm();
    }
    render() {
        const {formAddCategorieActions} = this.props
        const {formAddCategorie} = this.props
        const {user} = this.props
        const { initCategories} = this.props.categoriesAction;

        return (
            <FormAddCategorieComponent
                error={formAddCategorie.error}
                addCategorieRequestAction = {formAddCategorieActions.addCategorieRequest}
                userHash = {user.hash}
                initCategoriesAction = {initCategories}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        formAddCategorie: state.formAddCategorie
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formAddCategorieActions: bindActionCreators(FormAddCategorieActions, dispatch),
        categoriesAction: bindActionCreators(CategoriesAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCategorie)
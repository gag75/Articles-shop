import React, { Component } from 'react'
import AdminComponent from '../../components/Admin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormNewArticleActions from '../../actions/FormNewArticleActions'
import * as DialogActions from '../../actions/DialogActions'
import * as FormNewCategorieActions from '../../actions/FormNewCategorieActions'
import * as CategoriesAction from '../../actions/CategoriesAction'
import * as RemoveCategorieActions from '../../actions/RemoveCategorieActions'
import * as ApplicationsActions from '../../actions/ApplicationsActions'



export class Admin extends Component {
    componentWillMount(){
        this.props.applicationsActions.initApplications({hash: this.props.user.hash});
    }
    render() {
        const { applications} = this.props
        const { user} = this.props
        const {categories} = this.props
        const { formNewArticle } = this.props
        const { openDialog } = this.props.dialogActions
        const { closeDialog } = this.props.dialogActions
        const  initFormNewCategorie  = this.props.formNewCategorieActions.initForm;
        const { initCategories} = this.props.categoriesAction;
        const { removeCategorieRequest} = this.props.removeCategorieActions;
        const { initApplications} = this.props.applicationsActions;
        const { nextApplications} = this.props.applicationsActions;
        const { confirmApplication} = this.props.applicationsActions;
        const { rejectApplication} = this.props.applicationsActions;

        return (
            <AdminComponent
              categories = {categories.categories} 
              FormNewArticleActions = {this.props.FormNewArticleActions}
              error = {formNewArticle.error}
              openDialogAction = {openDialog}
              closeDialogAction = { closeDialog } 
              initFormNewCategorie = {initFormNewCategorie}
              initCategoriesAction = {initCategories}
              removeCategorieRequestAction = {removeCategorieRequest}
              user = {user}
              applications = {applications}
              initApplicationsAction = {initApplications}
              nextApplicationsAction = {nextApplications}
              confirmApplicationAction = {confirmApplication}
              rejectApplicationAction = {rejectApplication}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        categories : state.categories,
        formNewArticle: state.formNewArticle,
        user: state.user,
        applications:state.applicationsForAdmin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        FormNewArticleActions: bindActionCreators(FormNewArticleActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
        formNewCategorieActions : bindActionCreators (FormNewCategorieActions,dispatch),
        categoriesAction: bindActionCreators(CategoriesAction, dispatch),
        removeCategorieActions: bindActionCreators (RemoveCategorieActions,dispatch),
        applicationsActions : bindActionCreators(ApplicationsActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
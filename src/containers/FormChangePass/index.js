import React, { Component } from 'react'
import FormChangePassComponent from '../../components/FormChangePass'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormChangePassActions from '../../actions/FormChangePassActions'
import * as DialogActions from '../../actions/DialogActions'

export class FormChangePass extends Component {
    componentWillUnmount() {
        this.props.formChangePassActions.deinitFormChangePass();
    }
    render() {
        const { formChangePass } = this.props
        const { user } = this.props
        const { passRequest, validationPass } = this.props.formChangePassActions
        const { closeDialog } = this.props.dialogActions

        return (
            <FormChangePassComponent
                request={formChangePass.request}
                hash={user.hash}
                errorPass={formChangePass.errorPass}
                error={formChangePass.error}
                passRequestAction={passRequest}
                validationPassAction={validationPass}
                closeDialogAction={closeDialog}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formChangePass : state.formChangePass,
        user : state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formChangePassActions: bindActionCreators(FormChangePassActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormChangePass)
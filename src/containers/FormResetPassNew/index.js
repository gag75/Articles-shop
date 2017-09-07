import React, { Component } from 'react'
import FormResetPassNewComponent from '../../components/FormResetPassNew'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormResetPassNewActions from '../../actions/FormResetPassNewActions'
import * as DialogActions from '../../actions/DialogActions'

export class FormResetPassNew extends Component {
    componentWillUnmount() {
        this.props.formResetPassNewActions.deinitFormResetPassNew();
    }
    render() {
        const { formResetPassNew } = this.props
        const { passRequest, validationPass } = this.props.formResetPassNewActions
        const { closeDialog } = this.props.dialogActions

        return (
            <FormResetPassNewComponent
                request={formResetPassNew.request}
                hash={formResetPassNew.hash}
                errorPass={formResetPassNew.errorPass}
                error={formResetPassNew.error}
                passRequestAction={passRequest}
                validationPassAction={validationPass}
                closeDialogAction={closeDialog}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formResetPassNew : state.formResetPassNew
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formResetPassNewActions: bindActionCreators(FormResetPassNewActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResetPassNew)
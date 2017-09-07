import React, { Component } from 'react'
import FormResetPassEmailComponent from '../../components/FormResetPassEmail'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormResetPassEmailActions from '../../actions/FormResetPassEmailActions'
import * as DialogActions from '../../actions/DialogActions'

export class FormResetPassEmail extends Component {
    componentWillUnmount() {
        this.props.formResetPassEmailActions.deinitFormResetPassEmail();
    }
    render() {
        const { formResetPassEmail } = this.props
        const { emailRequest, validationEmail } = this.props.formResetPassEmailActions
        const { openDialog } = this.props.dialogActions

        return (
            <FormResetPassEmailComponent
                request={formResetPassEmail.request}
                email={formResetPassEmail.email}
                errorEmail={formResetPassEmail.errorEmail}
                error={formResetPassEmail.error}
                emailRequestAction={emailRequest}
                validationEmailAction={validationEmail}
                openDialogAction={openDialog}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formResetPassEmail : state.formResetPassEmail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formResetPassEmailActions: bindActionCreators(FormResetPassEmailActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResetPassEmail)
import React, { Component } from 'react'
import FormResetPassHashComponent from '../../components/FormResetPassHash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormResetPassHashActions from '../../actions/FormResetPassHashActions'
import * as FormResetPassNewActions from '../../actions/FormResetPassNewActions'
import * as DialogActions from '../../actions/DialogActions'

export class FormResetPassHash extends Component {
    componentWillUnmount() {
        this.props.formResetPassHashActions.deinitFormResetPassHash();
    }
    render() {
        const { formResetPassHash } = this.props
        const { hashRequest, validationHash } = this.props.formResetPassHashActions
        const { setHash } = this.props.formResetPassNewActions
        const { openDialog } = this.props.dialogActions
        
        return (
            <FormResetPassHashComponent
                request={formResetPassHash.request}
                hash={formResetPassHash.hash}
                errorHash={formResetPassHash.errorHash}
                error={formResetPassHash.error}
                hashRequestAction={hashRequest}
                validationHashAction={validationHash}
                setHashAction={setHash}
                openDialogAction={openDialog}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formResetPassHash : state.formResetPassHash
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formResetPassHashActions: bindActionCreators(FormResetPassHashActions, dispatch),
        formResetPassNewActions: bindActionCreators(FormResetPassNewActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResetPassHash)
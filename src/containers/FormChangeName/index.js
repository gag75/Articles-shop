import React, { Component } from 'react'
import FormChangeNameComponent from '../../components/FormChangeName'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormChangeNameActions from '../../actions/FormChangeNameActions'
import * as DialogActions from '../../actions/DialogActions'
import * as UserActions from '../../actions/UserActions'

export class FormChangeName extends Component {
    componentWillUnmount() {
        this.props.formChangeNameActions.deinitFormChangeName();
    }
    render() {
        const { formChangeName } = this.props
        const { user } = this.props
        const { nameRequest, existenceName } = this.props.formChangeNameActions
        const { closeDialog } = this.props.dialogActions
        const { newName } = this.props.userActions

        return (
            <FormChangeNameComponent
                request={formChangeName.request}
                hash={user.hash}
                name={user.name}
                errorName={formChangeName.errorName}
                error={formChangeName.error}
                nameRequestAction={nameRequest}
                existenceNameAction={existenceName}
                closeDialogAction={closeDialog}
                newNameAction={newName}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formChangeName : state.formChangeName,
        user : state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formChangeNameActions: bindActionCreators(FormChangeNameActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormChangeName)
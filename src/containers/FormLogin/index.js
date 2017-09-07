import React, { Component } from 'react'
import FormLoginComponent from '../../components/FormLogin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormLoginActions from '../../actions/FormLoginActions'
import * as UserActions from '../../actions/UserActions'
import * as DialogActions from '../../actions/DialogActions'

export class FormLogin extends Component {
    componentWillUnmount() {
        this.props.formLoginActions.deinitFormLogin();
    }
    render() {
        const { formLogin } = this.props
        const { loginRequest, validationName, validationPass } = this.props.formLoginActions
        const { userLogin } = this.props.userActions
        const { closeDialog, openDialog } = this.props.dialogActions
        return (
            <FormLoginComponent
                request={formLogin.request}
                name={formLogin.name}
                errorName={formLogin.errorName}
                errorPass={formLogin.errorPass}
                error={formLogin.error}
                loginRequestAction={loginRequest}
                validationNameAction={validationName}
                validationPassAction={validationPass}
                userLoginAction={userLogin}
                closeDialogAction={closeDialog}
                openDialogAction={openDialog}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formLogin : state.formLogin,
        user : state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formLoginActions: bindActionCreators(FormLoginActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)
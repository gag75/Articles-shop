import React, { Component } from 'react'
import FormRegistrationComponent from '../../components/FormRegistration'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FormRegistrationActions from '../../actions/FormRegistrationActions'
import * as UserActions from '../../actions/UserActions'

export class FormRegistration extends Component {
    componentWillUnmount() {
        this.props.formRegistrationActions.deinitFormRegistration();
    }
    render() {
        const { formRegistration } = this.props
        const { registrationRequest, existenceName, validationFullName, validationPass, existenceEmail } = this.props.formRegistrationActions
        const { userLogin } = this.props.userActions

        return (
            <FormRegistrationComponent
                request={formRegistration.request}
                name={formRegistration.name}
                fullName={formRegistration.fullName}
                email={formRegistration.email}
                errorName={formRegistration.errorName}
                errorFullName={formRegistration.errorFullName}
                errorPass={formRegistration.errorPass}
                errorEmail={formRegistration.errorEmail}
                error={formRegistration.error}
                registrationRequestAction={registrationRequest}
                existenceNameAction={existenceName}
                validationFullNameAction={validationFullName}
                validationPassAction={validationPass}
                existenceEmailAction={existenceEmail}
                userLoginAction={userLogin}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        formRegistration : state.formRegistration
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formRegistrationActions: bindActionCreators(FormRegistrationActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormRegistration)
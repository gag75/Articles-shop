import React, { Component } from 'react'
import UserComponent from '../../components/User'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'
import * as DialogActions from '../../actions/DialogActions'

export class User extends Component {
    render() {
        const { user } = this.props
        const { openDialog } = this.props.dialogActions

        return (
            <UserComponent
                name={user.name}
                email={user.email}
                fullName={user.fullName}
                openDialogAction={openDialog}
            >
            </UserComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        dialogActions: bindActionCreators(DialogActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
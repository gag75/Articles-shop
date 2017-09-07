import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'

export class LoginHash extends Component {
    componentWillMount() {
        if (this.props.user.type == 0) {
            this.props.userActions.userLoginHash();
        }
    }
    render() {
        let template;
        if (this.props.user.render) {
            template = this.props.children
        } else {
            template = null
        }
        return (
            template
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
        userActions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHash)
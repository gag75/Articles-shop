import React, { Component } from 'react'
import AppBarComponent from '../../components/AppBar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'
import * as ListArticlesActions from '../../actions/ListArticlesActions'


export class AppBar extends Component {
   
    render() {
        const { user } = this.props
        const { userLogout } = this.props.userActions
        const { initList } = this.props.listArticlesActions

        return (
            <AppBarComponent 
                typeUser={user.type}
                name={user.name}
                hash={user.hash}
                userLogoutAction={userLogout}
                initList = {initList}
            />
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
        listArticlesActions: bindActionCreators(ListArticlesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)



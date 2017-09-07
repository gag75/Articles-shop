import React from 'react'
import { connect } from 'react-redux'
import { ROUTING } from '../../constants/Routing'

export default function requireAuthentication(Component) {

    class AuthenticatedUser extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.user)
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user)
        }
        checkAuth(user) {
            const type = user.type;
            if (type != 1) {
                this.props.dispatch({
                    type: ROUTING,
                    payload: {
                        method: 'replace',
                        nextUrl: '/notFound'
                    }
                })
            }

        }
        render() {
            const type = this.props.user.type
            let template;

            if (type == 1) {
                template = <Component {...this.props} />
            } else {
                template = null
            }

            return (
                template
            )
        }
    }

    function mapStateToProps(state)  {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticatedUser)
}
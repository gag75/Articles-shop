import React from 'react'
import { connect } from 'react-redux'
import { ROUTING } from '../../constants/Routing'

export default function requireAuthentication(Component) {

    class Authenticated extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.user)
        }
        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user)
        }
        checkAuth(user) {
            const type = user.type;
            if (type == 1 || type == 2) {
                this.props.dispatch({
                    type: ROUTING,
                    payload: {
                        method: 'replace',
                        nextUrl: '/'
                    }
                })
            }

        }
        render() {
            const type = this.props.user.type
            let template;

            if (type ==0) {
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

    return connect(mapStateToProps)(Authenticated)
}
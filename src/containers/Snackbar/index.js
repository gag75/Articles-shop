import React, { Component } from 'react'
import SnackbarComponent from '../../components/Snackbar'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SnackbarActions from '../../actions/SnackbarActions'

export class Snackbar extends Component {
    render() {
        const { snackbar } = this.props
        const { closeSnackbar } = this.props.snackbarActions

        return (
            <SnackbarComponent
                openSnackbar={snackbar.open}
                textSnackbar={snackbar.text}
                closeSnackbarAction={closeSnackbar}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        snackbar : state.snackbar,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        snackbarActions: bindActionCreators(SnackbarActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)
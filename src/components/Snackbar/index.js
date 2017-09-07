import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class SnackbarComponent extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Snackbar
                    open={this.props.openSnackbar}
                    message={this.props.textSnackbar}
                    autoHideDuration={1500}
                    onRequestClose={this.props.closeSnackbar}
                />
            </MuiThemeProvider>
        )
    }
}
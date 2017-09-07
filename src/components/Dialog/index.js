import React, { PropTypes, Component } from 'react'
import style from './style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default class DialogComponent extends Component {
    handleCloseDialog() {
        if (!this.props.request) {
            this.props.closeDialogAction();
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <Dialog
                    title={this.props.name}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={::this.handleCloseDialog}
                    contentClassName={style.dialog}
                    autoDetectWindowHeight={false}
                >
                    {this.props.children}
                </Dialog>
            </MuiThemeProvider>
        )
    }
}

DialogComponent.propTypes = {
    closeDialogAction: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
}
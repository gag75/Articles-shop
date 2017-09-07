import React, { Component } from 'react'
import DialogComponent from '../../components/Dialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DialogActions from '../../actions/DialogActions'

import FormAddCategorie from '../FormAddCategorie'
import FormNewCategorie from '../FormNewCategorie'
import FormLogin from '../FormLogin'
import FormRegistration from '../FormRegistration'
import FormResetPassEmail from '../FormResetPassEmail'
import FormResetPassHash from '../FormResetPassHash'
import FormResetPassNew from '../FormResetPassNew'
import FormChangePass from '../FormChangePass'
import FormChangeName from '../FormChangeName'

export class Dialog extends Component {
    render() {
        const { dialog } = this.props
        const { closeDialog } = this.props.dialogActions

        let dialogOpen = dialog.open;
        let dialogName = dialog.name;

        let template;

        if (dialogName == 'FormLogin') {
            template = (
                <FormLogin />
            );
            dialogName = 'Вход'
        } else if (dialogName == 'FormRegistration') {
            template = (
                <FormRegistration />
            );
            dialogName = 'Регистрация'
        } else if (dialogName == 'FormResetPassEmail') {
            template = (
                <FormResetPassEmail />
            );
            dialogName = 'Восстановление пароля'
        } else if (dialogName == 'FormResetPassHash') {
            template = (
                <FormResetPassHash />
            );
            dialogName = 'Восстановление пароля'
        } else if (dialogName == 'FormResetPassNew') {
            template = (
                <FormResetPassNew/>
            );
            dialogName = 'Восстановление пароля'
        } else if (dialogName == 'FormChangePass') {
            template = (
                <FormChangePass/>
            );
            dialogName = 'Новый пароль'
        } else if (dialogName == 'FormChangeName') {
            template = (
                <FormChangeName/>
            );
            dialogName = 'Новый логин'
        }else if(dialogName == 'FormNewCategorie'){
            template = (
                <FormNewCategorie/>
                );
            dialogName = 'Изменить категорию'
        }else if(dialogName == 'FormAddCategorie'){
            template = (
                <FormAddCategorie/>
            );
            dialogName = 'Добавить категорию'
        } else {
            dialogOpen = false;
        }

        return (
            <DialogComponent
                open={dialogOpen}
                name={dialogName}
                closeDialogAction={closeDialog}
            >
                {template}
            </DialogComponent>
        )
    }
}

function mapStateToProps(state) {
    return {
        dialog : state.dialog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogActions: bindActionCreators(DialogActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
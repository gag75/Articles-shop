import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import style from './style.css'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'


export default class SideBarComponent extends Component {
    render() {
        let selectActiveActions=this.props.selectActiveActions;
        let categories = this.props.categories;
        let initListAction = this.props.initListAction;
        let sort = this.props.sort;
        let state = this.props.state;
        let user = this.props.user;
        let template = categories.map((value,index) => {
            var b=function(e){
                if(user.type!=2){
                    e.preventDefault();
                }   
                selectActiveActions({activeCategorie:value.id});
                initListAction({hash:user.hash, categorie:value.id, state:state, sort});
            }
            return(
                <Link  onClick={b} to={'/'} key={value.id+index} className={style.link} >
                    <MenuItem className={(value.id==this.props.activeCategorie) ? style.active : ''}> {value.categories}</MenuItem>
                </Link>
            )
        });
        var b=function(e){
            if(user.type!=2){
                    e.preventDefault();
            }
            selectActiveActions({activeCategorie: null});
            initListAction({hash:user.hash,categorie:null, state:state, sort});
        }
        var c=function(){
            selectActiveActions({activeCategorie: null});
            initListAction({hash:user.hash,categorie:null,sort});
        }
        return (
            <div>
                <MuiThemeProvider>
                    <Drawer open={true}>
                        <Link  onClick={c} to='/' className={style.link}>
                            <MenuItem> Home </MenuItem>
                        </Link>
                        <Link  onClick={b} to='/' className={style.link}>
                            <MenuItem className={(this.props.activeCategorie==null) ? style.active : ''} > All </MenuItem>
                        </Link>
                        {template}
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import NavbarTop from '../Components/Navbar/navbar';
import './userHome.less';
export default class UserHome extends Component {
    render(){
        return(
            <div className="user-home">
                <NavbarTop/>
                {/*<a>User Home</a>*/}
            </div>
        );
    }
}
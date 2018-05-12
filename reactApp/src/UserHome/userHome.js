/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarTop from '../Components/Navbar/navbar';
import TextEditor from '../Components/TextEditor/textEditor';
import './userHome.less';
export default class UserHome extends Component {
    render(){
        return(
            <div className="user-home">
                <NavbarTop/>
                <Link to="/text-editor">
                    <button className="btn btn-outline-light my-2 my-sm-0">New File</button>
                </Link>
                &nbsp;&nbsp;
                <Link to="/text-editor">
                    <button className="btn btn-outline-light my-2 my-sm-0">Text Editor</button>
                </Link>
                {/*<TextEditor class="test"/>*/}
                {/*<a>User Home</a>*/}
            </div>
        );
    }
}
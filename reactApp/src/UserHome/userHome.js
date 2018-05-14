/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarTop from '../Components/Navbar/navbar';
import TextEditor from '../Components/TextEditor/textEditor';
import { connect } from 'react-redux';
import axios from 'axios';
import './userHome.less';
export class UserHome extends Component {
    createNewFile(){
        // creates a new file in database
        axios.get('http://localhost:3000/createNewFile')
            .then(resp => {
                if (resp.status === 200) {
                    console.log('success');
                }
            })
            .catch(err => {
                console.log("unable to create new file ", err);
            })
    }
    render(){
        return(
            <div className="user-home">
                <NavbarTop/>
                <Link to="/text-editor">
                    <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => this.createNewFile()}>New File</button>
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

function mapStateToProps(state){
    console.log(state);
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps)(UserHome);
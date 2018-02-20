/**
 * Created by siyuanxu on 2/11/18.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Welcome from '../Components/Welcome/welcome';
import "./loginPage.less";
export default class LoginPage extends Component {

    render() {
        return (
            <div className="LoginPage">
                <Welcome/>
                <div id="form-parent">
                    <form id="form-child">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light my-2 my-sm-0">Sign in</button><br/>
                        <Link to="/sign-up"><small><a>New User?</a></small></Link>
                    </form>
                </div>
            </div>
        );
    }
}


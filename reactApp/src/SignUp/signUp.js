/**
 * Created by siyuanxu on 2/19/18.
 */
import React, { Component } from 'react';
import Welcome from '../Components/Welcome/welcome';
import { Link } from 'react-router-dom';
import './signUp.less';

export default class SignUp extends Component {
    render(){
        return(
            <div className="Sign-up">
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
                        <div className="form-group">
                            <label>Password Again</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password Again"/>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light my-2 my-sm-0">Sign Up</button><br/>
                    </form>
                </div>
            </div>
        );
    }
}
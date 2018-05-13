/**
 * Created by siyuanxu on 2/11/18.
 */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Welcome from '../Components/Welcome/welcome';
import "./loginPage.less";
export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            fireRedirect: false,
            submitErrMsg: "Wrong username or password!"
        }
    }
    onSubmit(event){
        event.preventDefault();
        axios.get("http://localhost:3000/loginAuth", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(resp => {
                console.log(resp);
                if(resp.data){
                    $('#submit-button').popover('hide');
                    this.setState({
                        fireRedirect: true
                    });
                }
                else {
                    $('#submit-button').popover('enable');
                }
            })
            .catch(err => {
                console.log("Error: fails to connect to server for login", err);
            });
    }
    componentDidMount(){
        $('#submit-button').popover('enable');
        $('#submit-button').popover('hide');
    }
    render() {
        return (
            <div className="LoginPage">
                <Welcome/>
                <div id="form-parent">
                    <form id="form-child" onSubmit={(e) => this.onSubmit(e)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"
                                   onChange={(e) => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                   onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light my-2 my-sm-0" id="submit-button" data-container="body"
                                data-toggle="popover" data-placement="right" data-content={this.state.submitErrMsg}>Sign in</button><br/>
                        <Link to="/sign-up"><small><a>New User?</a></small></Link>
                    </form>
                </div>
                {
                    this.state.fireRedirect && <Redirect to={{pathname: '/user-home'}}></Redirect>
                }
            </div>
        );
    }
}


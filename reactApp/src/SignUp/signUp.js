/**
 * Created by siyuanxu on 2/19/18.
 */
import React, { Component } from 'react';
import Welcome from '../Components/Welcome/welcome';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './signUp.less';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            fireRedirect: false,
            username: "",
            password: "",
            passwordAgain: "",
            submitMsg: "Passwords must be the same and longer than 5 characters!"
        }
    }
    // submit data to database
    onSubmit(event){
        event.preventDefault();
        if(this.state.password==this.state.passwordAgain && this.state.password.length>=5)
        {
            $('#submit-button').popover('hide');
            axios.get("http://localhost:3000/signup", {
                params: {
                        username: this.state.username,
                        password: this.state.password
                    }
                })
                .then((resp) => {
                    if(resp.data)
                    {
                        this.setState({
                            fireRedirect: true
                        });
                    }
                })
                .catch(err => {
                    console.log("signup error!", err);
                });
        }
        else {
            $('#submit-button').popover('enable');
        }
    }
    componentDidMount(){
        $('#submit-button').popover('enable');
        $('#submit-button').popover('hide');
    }
    render(){
        return(
            <div className="Sign-up">
                <Welcome/>
                <div id="form-parent" onSubmit={(event) => this.onSubmit(event)}>
                    <form id="form-child">
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
                        <div className="form-group">
                            <label>Password Again</label>
                            <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password Again"
                                   onChange={(e) => this.setState({passwordAgain: e.target.value})}/>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light my-2 my-sm-0" id="submit-button" data-container="body"
                                data-toggle="popover" data-placement="right" data-content={this.state.submitMsg}>Sign Up</button><br/>
                        <Link to="/"><small><a>Home</a></small></Link>
                    </form>
                </div>
                {
                    this.state.fireRedirect && (
                        <Redirect to={{pathname: '/'}}></Redirect>
                    )
                }
            </div>
        );
    }
}
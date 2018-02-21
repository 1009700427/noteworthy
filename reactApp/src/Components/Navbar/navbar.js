/**
 * Created by siyuanxu on 2/12/18.
 */
import React from "react";
import { Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import './navbar.less';
export default class NavbarTop extends React.Component{
    constructor(){
        super();
        this.state = {
            signOutRedirect: false
        }
    }
    signOut(){
        this.setState({
            signOutRedirect: true
        });
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-light navbar-expand-sm transparent">
                        <a className="navbar-brand" href="#">Noteworthy</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {/*<ul className="navbar-nav">*/}
                                {/*<li className="nav-item active">*/}
                                    {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" href="#">Features</a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" href="#">Pricing</a>*/}
                                {/*</li>*/}
                                {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" href="#">Disabled</a>*/}
                                {/*</li>*/}
                            {/*</ul>*/}
                            <form className="form-inline">
                                <div className="form-group">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search For Documents" aria-label="Search"/>
                                </div>
                                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <button className="btn btn-outline-danger my-2 mr-sm-2 my-sm-0" id="sign-out" onClick={() => this.signOut()}>Sign Out</button>
                            </div>
                        </div>
                </nav>
                {
                    this.state.signOutRedirect && <Redirect to={{pathname: "/"}}></Redirect>
                }
            </div>
        );
    }
}